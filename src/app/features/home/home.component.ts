import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppSettingsService } from '../../core/services/app-settings.service';
import { TranslocoPipe } from '@jsverse/transloco';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private router = inject(Router);
  private appSettings = inject(AppSettingsService);

  appConfig = computed(() => this.appSettings.config);

  features = [
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
}
