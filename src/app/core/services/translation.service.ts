import { Injectable, signal } from '@angular/core';
import { TranslocoService, translate } from '@jsverse/transloco';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  currentLang = signal('es');
  
  constructor(private transloco: TranslocoService) {
    this.currentLang.set(this.transloco.getActiveLang() || 'es');
  }
  
  changeLanguage(lang: string): void {
    this.transloco.setActiveLang(lang);
    this.currentLang.set(lang);
  }
  
  getTranslation(key: string, params?: Record<string, any>): string {
    return translate(key, params);
  }
  
  instantTranslate(key: string, params?: Record<string, any>): string {
    return this.transloco.translate(key, params);
  }
}
