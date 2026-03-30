import {
  ApplicationConfig,
  enableProdMode,
  inject,
  isDevMode,
  provideAppInitializer,
} from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withInMemoryScrolling,
  withPreloading,
} from '@angular/router';

import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideTransloco } from '@jsverse/transloco';
import { routes } from './app.routes';
import { AppSettingsService } from './core/services/app-settings.service';
import { TranslocoHttpLoader } from './transloco-loader';

// Enable prod mode for better performance
if (!isDevMode()) {
  enableProdMode();
}

export const appConfig: ApplicationConfig = {
  providers: [
    // Optimized router configuration
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
    ),

    // Optimized HTTP client - solo donde se necesite HTTP
    provideHttpClient(withFetch(), withInterceptorsFromDi()),

    // App initializer for settings - mover a feature específica si es posible
    provideAppInitializer(() => {
      const appSettingsService = inject(AppSettingsService);
      return appSettingsService.load();
    }),

    // Optimized Transloco configuration - mover a feature específica
    provideTransloco({
      config: {
        availableLangs: ['en', 'es'],
        defaultLang: 'es',
        reRenderOnLangChange: false, // Deshabilitado completamente para performance
        prodMode: !isDevMode(),
        missingHandler: {
          logMissingKey: false,
          allowEmpty: false,
        },
      },
      loader: TranslocoHttpLoader,
    }),
  ],
};
