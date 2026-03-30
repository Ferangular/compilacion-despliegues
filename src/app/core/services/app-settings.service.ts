import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AppSettings } from '../interfaces/app-settings.interface';

@Injectable({
  providedIn: 'root',
})
export class AppSettingsService {
  private http = inject(HttpClient);
  private settings!: AppSettings;
  
  // Reactive signals for better performance
  public readonly configSignal = signal<AppSettings | null>(null);
  public readonly isLoading = signal<boolean>(true);
  public readonly error = signal<string | null>(null);

  async load(): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);
    
    try {
      this.settings = await firstValueFrom(
        this.http.get<AppSettings>(environment.jsonFile).pipe(
          catchError((err) => {
            console.error('Failed to load app settings:', err);
            this.error.set('Failed to load configuration');
            // Fallback to default settings
            return of(this.getDefaultSettings());
          })
        )
      );
      
      this.configSignal.set(this.settings);
    } catch (error) {
      console.error('Critical error loading settings:', error);
      this.settings = this.getDefaultSettings();
      this.configSignal.set(this.settings);
      this.error.set('Using fallback configuration');
    } finally {
      this.isLoading.set(false);
    }
  }

  get config(): AppSettings {
    return this.settings || this.getDefaultSettings();
  }
  
  // Performance: memoized getters
  get appName(): string {
    return this.config.appName;
  }
  
  get theme(): AppSettings['theme'] {
    return this.config.theme;
  }
  
  get isProduction(): boolean {
    return this.config.environmentName === 'Producción';
  }
  
  private getDefaultSettings(): AppSettings {
    return {
      appName: 'Compilación y Despliegues',
      environmentName: 'Development',
      apiUrl: '',
      debug: true,
      logo: 'assets/icons/logo.svg',
      theme: {
        primary: '#1976d2',
        secondary: '#42a5f5',
        accent: '#e3f2fd'
      },
      ui: {
        showEnvironmentBadge: true,
        showDebugPanel: true
      }
    };
  }
}
