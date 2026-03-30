import { TranslocoConfig } from '@jsverse/transloco';

export const translocoConfig: TranslocoConfig = {
  availableLangs: ['es', 'en'],
  defaultLang: 'es',
  fallbackLang: 'es',
  prodMode: false,
  reRenderOnLangChange: true,
  failedRetries: 2,
  flatten: {
    aot: true,
  },
  interpolation: ['{{', '}}'],
  scopes: {
    keepCasing: true,
  },
  missingHandler: {
    useFallbackTranslation: true,
    logMissingKey: true,
    allowEmpty: true,
  },
};
