import {
  ApplicationConfig,
  inject,
  isDevMode,
  provideAppInitializer,
  enableProdMode,
} from '@angular/core';
import { provideRouter, withPreloading, withInMemoryScrolling } from '@angular/router';
import { PreloadAllModules } from '@angular/router';

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
        scrollPositionRestoration: 'enabled'
      })
    ),

    // Optimized HTTP client
    provideHttpClient(
      withFetch(),
      withInterceptorsFromDi()
    ),

    // App initializer for settings
    provideAppInitializer(() => {
      const appSettingsService = inject(AppSettingsService);
      return appSettingsService.load();
    }),

    // Optimized Transloco configuration
    provideTransloco({
      config: {
        availableLangs: ['en', 'es'],
        defaultLang: 'es',
        reRenderOnLangChange: !isDevMode(), // Disable for production
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
