import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AppSettings } from '../interfaces/app-settings.interface';

@Injectable({
  providedIn: 'root',
})
export class AppSettingsService {
  private http = inject(HttpClient);
  private settings!: AppSettings;

  async load(): Promise<void> {
    try {
      // Intentar cargar el archivo, pero si falla usar valores por defecto
      this.settings = await firstValueFrom(this.http.get<AppSettings>(environment.jsonFile));
    } catch (error) {
      console.log('No se pudo cargar app-settings.json, usando valores por defecto');
      // Valores por defecto para evitar errores
      this.settings = {
        appName: 'Firebase Hosting Demo',
        environmentName: 'Producción',
        apiUrl: 'https://api.miproyecto.com/api',
        debug: false,
        logo: 'assets/icons/logo-default.svg',
        theme: {
          primary: '#ffca28',
          secondary: '#42a5f5',
          accent: '#66bb6a'
        },
        ui: {
          showEnvironmentBadge: true,
          showDebugPanel: false
        }
      };
    }
  }

  get config(): AppSettings {
    return this.settings;
  }
}
