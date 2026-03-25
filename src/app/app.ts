import { Component, signal, inject, OnInit } from '@angular/core';
import { AppSettingsService } from './core/services/app-settings.service';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('Compilación & Despliegues');
  private appSettingsService = inject(AppSettingsService);

  get settings() {
    return this.appSettingsService.config;
  }

  get logo(): string {
    return this.settings?.logo ?? 'assets/icons/logo-dev.svg';
  }

  get primaryColor(): string {
    return this.settings?.theme?.primary ?? '#0070f3';
  }

  get secondaryColor(): string {
    return this.settings?.theme?.secondary ?? '#64748b';
  }

  get accentColor(): string {
    return this.settings?.theme?.accent ?? '#f59e0b';
  }

  ngOnInit() {
    this.updateCSSVariables();
  }

  private updateCSSVariables() {
    const root = document.documentElement;
    
    if (this.settings?.theme) {
      root.style.setProperty('--primary-color', this.settings.theme.primary);
      root.style.setProperty('--secondary-color', this.settings.theme.secondary);
      root.style.setProperty('--accent-color', this.settings.theme.accent);
      
      // Actualizar gradientes con los colores dinámicos
      root.style.setProperty('--gradient-1', 
        `linear-gradient(135deg, ${this.settings.theme.primary} 0%, ${this.settings.theme.secondary} 100%)`);
      root.style.setProperty('--gradient-2', 
        `linear-gradient(135deg, ${this.settings.theme.secondary} 0%, ${this.settings.theme.accent} 100%)`);
      root.style.setProperty('--gradient-3', 
        `linear-gradient(135deg, ${this.settings.theme.accent} 0%, ${this.settings.theme.primary} 100%)`);
    }
  }
}
