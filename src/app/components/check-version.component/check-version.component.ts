import { Component, inject } from '@angular/core';
import { AppSettingsService } from '../../core/services/app-settings.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-check-version.component',
  imports: [],
  templateUrl: './check-version.component.html',
  styleUrl: './check-version.component.scss',
})
export class CheckVersionComponent {
  environment = environment;
  appSettingsService = inject(AppSettingsService);

  get settings() {
    return this.appSettingsService.config;
  }

  get apiUrl(): string {
    return this.settings?.apiUrl ?? '';
  }

  get debug(): boolean {
    return this.settings?.debug ?? false;
  }

  get appName(): string {
    return this.settings?.appName ?? '';
  }

  get environmentName(): string {
    return this.settings?.environmentName ?? '';
  }

  get logo(): string {
    return this.settings?.logo ?? '';
  }

  get primaryColor(): string {
    return this.settings?.theme?.primary ?? '#1976d2';
  }

  get secondaryColor(): string {
    return this.settings?.theme?.secondary ?? '#42a5f5';
  }

  get accentColor(): string {
    return this.settings?.theme?.accent ?? '#90caf9';
  }

  get showEnvironmentBadge(): boolean {
    return this.settings?.ui?.showEnvironmentBadge ?? false;
  }

  get showDebugPanel(): boolean {
    return this.settings?.ui?.showDebugPanel ?? false;
  }
}
