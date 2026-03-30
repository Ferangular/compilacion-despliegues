import { inject, Injectable, signal } from '@angular/core';
import { translate, TranslocoService } from '@jsverse/transloco';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  currentLang = signal('es');
  transloco = inject(TranslocoService);

  constructor() {
    this.currentLang.set(this.transloco.getActiveLang() || 'es');
  }

  changeLanguage(lang: string): void {
    this.transloco.setActiveLang(lang);
    this.currentLang.set(lang);
  }

  getTranslation(key: string, params?: Record<string, unknown>): string {
    return translate(key, params);
  }

  instantTranslate(key: string, params?: Record<string, unknown>): string {
    return this.transloco.translate(key, params);
  }
}
