import { Component, computed, inject } from '@angular/core';
import { AppSettingsService } from '../../../../core/services/app-settings.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  private appSettings = inject(AppSettingsService);
  
  appConfig = computed(() => this.appSettings.config);
  
  currentYear = computed(() => new Date().getFullYear());
}
