import { Component, signal, computed, inject } from '@angular/core';
import { AppSettingsService } from '../../core/services/app-settings.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  private appSettings = inject(AppSettingsService);
  
  appConfig = computed(() => this.appSettings.config);
  
  settings = signal({
    enableLazyLoading: true,
    enablePreloading: false,
    preloadStrategy: 'prefetch' as 'preload' | 'prefetch' | 'none',
    enableSourceMaps: false,
    enableBundleAnalyzer: false,
    enableServiceWorker: false,
    enableSSR: false,
    enableZoneless: false,
    enableImageOptimization: true,
    enableCacheHeaders: true,
    cacheStrategy: 'cache-first' as 'cache-first' | 'network-first' | 'stale-while-revalidate'
  });

  performanceOptions = [
    { key: 'enableLazyLoading', label: 'Lazy Loading', description: 'Carga componentes bajo demanda' },
    { key: 'enablePreloading', label: 'Preloading', description: 'Precarga componentes en segundo plano' },
    { key: 'enableSourceMaps', label: 'Source Maps', description: 'Mapas de origen para debugging' },
    { key: 'enableBundleAnalyzer', label: 'Bundle Analyzer', description: 'Análisis de tamaño de bundle' },
    { key: 'enableServiceWorker', label: 'Service Worker', description: 'Caché y funcionalidades offline' },
    { key: 'enableSSR', label: 'Server-Side Rendering', description: 'Renderizado en servidor' },
    { key: 'enableZoneless', label: 'Zoneless', description: 'Sin Zone.js para mejor rendimiento' },
    { key: 'enableImageOptimization', label: 'Optimización de Imágenes', description: 'WebP, lazy loading, CDN' },
    { key: 'enableCacheHeaders', label: 'Headers de Caché', description: 'Estrategias de caché HTTP' }
  ];

  updateSetting(key: keyof ReturnType<typeof this.settings>, value: any): void {
    this.settings.update(current => ({ ...current, [key]: value }));
  }

  resetSettings(): void {
    this.settings.set({
      enableLazyLoading: true,
      enablePreloading: false,
      preloadStrategy: 'prefetch',
      enableSourceMaps: false,
      enableBundleAnalyzer: false,
      enableServiceWorker: false,
      enableSSR: false,
      enableZoneless: false,
      enableImageOptimization: true,
      enableCacheHeaders: true,
      cacheStrategy: 'cache-first'
    });
  }

  exportSettings(): void {
    const data = JSON.stringify(this.settings(), null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'performance-settings.json';
    a.click();
    URL.revokeObjectURL(url);
  }
}
