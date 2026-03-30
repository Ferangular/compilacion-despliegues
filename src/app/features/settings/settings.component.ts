import { Component, signal, computed, inject } from '@angular/core';
import { AppSettingsService } from '../../core/services/app-settings.service';

interface PerformanceSettings {
  enableLazyLoading: boolean;
  enablePreloading: boolean;
  preloadStrategy: 'preload' | 'prefetch' | 'none';
  enableSourceMaps: boolean;
  enableBundleAnalyzer: boolean;
  enableServiceWorker: boolean;
  enableSSR: boolean;
  enableZoneless: boolean;
  enableImageOptimization: boolean;
  enableCacheHeaders: boolean;
  cacheStrategy: 'cache-first' | 'network-first' | 'stale-while-revalidate';
}

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

  settings = signal<PerformanceSettings>({
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

  performanceOptions: { key: keyof PerformanceSettings; label: string; description: string }[] = [
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

  updateSetting(key: keyof PerformanceSettings, value: PerformanceSettings[keyof PerformanceSettings]): void {
    this.settings.update(current => ({ ...current, [key]: value }));
  }

  resetSettings(): void {
    this.settings.set({
      enableLazyLoading: true,
      enablePreloading: false,
      preloadStrategy: 'prefetch' as const,
      enableSourceMaps: false,
      enableBundleAnalyzer: false,
      enableServiceWorker: false,
      enableSSR: false,
      enableZoneless: false,
      enableImageOptimization: true,
      enableCacheHeaders: true,
      cacheStrategy: 'cache-first' as const
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

  enabledSettingsCount = computed(() => {
    return Object.values(this.settings()).filter(v => typeof v === 'boolean' && v).length;
  });

  optimizationLevel = computed(() => {
    return this.enabledSettingsCount() >= 6 ? 'Alta' : 'Media';
  });

  protected readonly Object = Object;
  protected readonly HTMLInputElement = HTMLInputElement;

  onInputChange(event: Event, key: keyof PerformanceSettings): void {
    const input = event.target as HTMLInputElement;
    
    // Type cast based on the expected value type for each key
    if (key === 'preloadStrategy') {
      this.updateSetting(key, input.value as 'preload' | 'prefetch' | 'none');
    } else if (key === 'cacheStrategy') {
      this.updateSetting(key, input.value as 'cache-first' | 'network-first' | 'stale-while-revalidate');
    } else {
      // For boolean fields, convert string to boolean
      const currentValue = this.settings()[key];
      if (typeof currentValue === 'boolean') {
        this.updateSetting(key, input.checked);
      } else {
        // This should not happen based on the interface, but handle it safely
        console.warn(`Unexpected setting type for key: ${key}`);
      }
    }
  }
}
