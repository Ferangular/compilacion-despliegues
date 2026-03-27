export interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  bundleSize: number;
  memoryUsage: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
}

export interface PerformanceConfig {
  enableSourceMaps: boolean;
  enableBundleAnalyzer: boolean;
  enableLazyLoading: boolean;
  enablePreloading: boolean;
  preloadStrategy: 'preload' | 'prefetch' | 'none';
}

export interface PerformanceReport {
  timestamp: Date;
  metrics: PerformanceMetrics;
  config: PerformanceConfig;
  recommendations: string[];
}
