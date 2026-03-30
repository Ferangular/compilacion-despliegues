import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Translation, TranslocoLoader, TranslocoLoaderData } from '@jsverse/transloco';
import { firstValueFrom, BehaviorSubject, of, Observable } from 'rxjs';
import { catchError, shareReplay, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private http = inject(HttpClient);
  
  // Performance: Cache translations in memory
  private translationCache = new Map<string, Translation>();
  private loadingSubjects = new Map<string, BehaviorSubject<Translation | null>>();

  getTranslation(lang: string): Observable<Translation> {
    console.log(`Cargando traducciones para: ${lang}`);
    
    // Check cache first
    if (this.translationCache.has(lang)) {
      console.log(`Usando cache para: ${lang}`);
      return of(this.translationCache.get(lang)!);
    }

    // Check if already loading
    if (this.loadingSubjects.has(lang)) {
      console.log(`Ya está cargando: ${lang}`);
      return this.loadingSubjects.get(lang)!.asObservable().pipe(
        map(translation => translation || {} as Translation)
      );
    }

    // Create new loading subject
    const subject = new BehaviorSubject<Translation | null>(null);
    this.loadingSubjects.set(lang, subject);

    // Load translation
    const url = `/assets/i18n/${lang}.json`;
    console.log(`Haciendo request a: ${url}`);
    
    this.http.get<Translation>(url).pipe(
      catchError((error) => {
        console.error(`Failed to load translation for language: ${lang}`, error);
        // Return empty translation as fallback
        return of({} as Translation);
      }),
      shareReplay(1) // Cache the HTTP response
    ).subscribe({
      next: (translation) => {
        console.log(`Traducciones cargadas para ${lang}:`, translation);
        this.translationCache.set(lang, translation);
        subject.next(translation);
        subject.complete();
        this.loadingSubjects.delete(lang);
      },
      error: (error) => {
        console.error(`Critical error loading translation for ${lang}:`, error);
        const emptyTranslation = {} as Translation;
        this.translationCache.set(lang, emptyTranslation);
        subject.next(emptyTranslation);
        subject.complete();
        this.loadingSubjects.delete(lang);
      }
    });

    return subject.asObservable().pipe(
      map(translation => translation || {} as Translation)
    );
  }

  // Preload translations for better performance
  async preloadTranslations(languages: string[]): Promise<void> {
    const promises = languages.map(lang => 
      firstValueFrom(this.getTranslation(lang))
    );
    
    try {
      await Promise.all(promises);
      console.log(`Preloaded translations for: ${languages.join(', ')}`);
    } catch (error) {
      console.error('Failed to preload translations:', error);
    }
  }

  // Clear cache (useful for language switching or testing)
  clearCache(): void {
    this.translationCache.clear();
    this.loadingSubjects.clear();
  }
}
