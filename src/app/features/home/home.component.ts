import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppSettingsService } from '../../core/services/app-settings.service';
import { TranslocoPipe } from '@jsverse/transloco';
import { HomeFeaturesSectionComponent } from './home-features-section/home-features-section.component';

export interface Feature {
  title: string;
  description: string;
  icon: string;
  path: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TranslocoPipe, HomeFeaturesSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private router = inject(Router);
  private appSettings = inject(AppSettingsService);

  appConfig = computed(() => this.appSettings.config);

  features: Feature[] = [
    {
      title: 'Lazy Loading',
      description: 'Carga de componentes bajo demanda para reducir el bundle inicial',
      icon: '⚡',
      path: '/list'
    },
    {
      title: 'Laboratorio de Rendimiento',
      description: 'Herramientas de análisis y optimización en tiempo real',
      icon: '🔬',
      path: '/performance-lab'
    },
    {
      title: 'Laboratorio de Imágenes',
      description: 'Comparación de lazy loading nativo vs manual con IntersectionObserver',
      icon: '🖼️',
      path: '/image-lab'
    },
    {
      title: 'Code Splitting',
      description: 'División inteligente del código para carga progresiva',
      icon: '📦',
      path: '/detail/1'
    },
    {
      title: 'Configuración Avanzada',
      description: 'Ajustes finos de optimización y caché',
      icon: '⚙️',
      path: '/settings'
    }
  ];

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  reloadFeatures(): void {
    // Force reload of deferred content by triggering a change detection
    // In a real app, this could reload data from an API
    window.location.reload();
  }
}
