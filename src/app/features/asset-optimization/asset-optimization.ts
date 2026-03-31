import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';

interface TestImage {
  id: number;
  title: string;
  src: string;
  width: number;
  height: number;
  format: 'JPEG' | 'WebP' | 'AVIF';
  optimized: boolean;
  description: string;
}

interface ResponsiveImageSource {
  width: number;
  src: string;
}

interface ImagePerformance {
  url: string;
  title: string;
  loadTime: number;
  size: number;
  format: string;
}

interface CdnProvider {
  name: string;
  description: string;
  improvementFactor: number;
}

interface CDNPerformance {
  provider: string;
  simulatedLoadTime: number;
  simulatedOriginalSize: number;
  simulatedOptimizedSize: number;
}

interface ImageOptimizationResult {
  sizeSavings: number;
  avgOriginalSize: number;
  avgOptimizedSize: number;
}

interface CdnPerformanceResult {
  avgLoadTime: number;
  avgSizeSavings: number;
}

interface TestResults {
  imageOptimization?: ImageOptimizationResult;
  cdnPerformance?: CdnPerformanceResult;
}

@Component({
  selector: 'app-asset-optimization',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './asset-optimization.html',
  styleUrl: './asset-optimization.css',
})
export class AssetOptimization {
  readonly testImages: TestImage[] = [
    {
      id: 1,
      title: 'Imagen original JPEG',
      src: 'assets/images/hero-original.jpg',
      width: 1600,
      height: 900,
      format: 'JPEG',
      optimized: false,
      description: 'Formato clásico, normalmente más pesado.',
    },
    {
      id: 2,
      title: 'Imagen optimizada WebP',
      src: 'assets/images/hero-optimized.webp',
      width: 1600,
      height: 900,
      format: 'WebP',
      optimized: true,
      description: 'Formato moderno optimizado para web.',
    },
    {
      id: 3,
      title: 'Tarjeta optimizada WebP',
      src: 'assets/images/card-1.webp',
      width: 1200,
      height: 900,
      format: 'WebP',
      optimized: true,
      description: 'Imagen secundaria de menor peso.',
    },
  ];

  readonly responsiveImageSources: ResponsiveImageSource[] = [
    { width: 320, src: 'assets/images/card-1.webp' },
    { width: 640, src: 'assets/images/card-1.webp' },
    { width: 800, src: 'assets/images/hero-optimized.webp' },
    { width: 1200, src: 'assets/images/hero-optimized.webp' },
  ];

  readonly cdnProviders: CdnProvider[] = [
    {
      name: 'Cloudinary',
      description: 'Optimización automática de formato y calidad.',
      improvementFactor: 0.58,
    },
    {
      name: 'Imgix',
      description: 'Manipulación dinámica y compresión adaptativa.',
      improvementFactor: 0.52,
    },
    {
      name: 'ImageKit',
      description: 'Placeholders ligeros y optimización visual.',
      improvementFactor: 0.55,
    },
    {
      name: 'Cloudflare',
      description: 'Entrega global con baja latencia.',
      improvementFactor: 0.48,
    },
  ];

  readonly testFonts = [
    {
      family: 'Inter',
      format: 'WOFF2',
      display: 'swap',
      description: 'Fuente moderna y ligera para interfaces.',
    },
    {
      family: 'Roboto',
      format: 'WOFF2',
      display: 'swap',
      description: 'Fuente versátil con buen rendimiento.',
    },
    {
      family: 'JetBrains Mono',
      format: 'WOFF2',
      display: 'swap',
      description: 'Fuente monoespaciada optimizada para código.',
    },
  ];

  readonly imagePerformance = signal<ImagePerformance[]>([]);
  readonly cdnPerformance = signal<CDNPerformance[]>([]);
  readonly testResults = signal<TestResults>({});

  readonly isTestRunning = signal(false);
  readonly testProgress = signal(0);
  readonly currentAction = signal('');

  readonly hasTestResults = computed(() => {
    const results = this.testResults();
    return !!results.imageOptimization || !!results.cdnPerformance;
  });

  readonly progressLabel = computed(() => `${this.testProgress().toFixed(1)}%`);

  readonly currentImageResult = computed(() => this.testResults().imageOptimization);
  readonly currentCdnResult = computed(() => this.testResults().cdnPerformance);

  constructor() {
    effect(() => {
      const progress = this.testProgress();
      const running = this.isTestRunning();

      if (!running && progress === 100) {
        const timeout = setTimeout(() => {
          this.currentAction.set('Prueba completada');
        }, 200);

        return () => clearTimeout(timeout);
      }

      return;
    });
  }

  async runAllTests(): Promise<void> {
    await this.testImagePerformance();
    await this.delay(500);
    await this.testCDNPerformance();
  }

  async testImagePerformance(): Promise<void> {
    this.isTestRunning.set(true);
    this.currentAction.set('Midiendo imágenes locales...');
    this.testProgress.set(0);
    this.imagePerformance.set([]);

    this.testResults.update((current) => ({
      ...current,
      imageOptimization: undefined,
    }));

    const results: ImagePerformance[] = [];

    for (let i = 0; i < this.testImages.length; i++) {
      const image = this.testImages[i];
      const startTime = performance.now();

      try {
        const response = await fetch(image.src, { cache: 'no-store' });
        const blob = await response.blob();
        const endTime = performance.now();

        results.push({
          url: image.src,
          title: image.title,
          loadTime: endTime - startTime,
          size: blob.size,
          format: image.format,
        });

        this.imagePerformance.set([...results]);
      } catch (error) {
        console.error(`Error midiendo imagen ${image.title}`, error);
      }

      this.testProgress.set(((i + 1) / this.testImages.length) * 100);
      await this.delay(700);
    }

    this.analyzeImageResults();
    this.isTestRunning.set(false);
  }

  async testCDNPerformance(): Promise<void> {
    this.isTestRunning.set(true);
    this.currentAction.set('Simulando rendimiento de CDN...');
    this.testProgress.set(0);
    this.cdnPerformance.set([]);

    this.testResults.update((current) => ({
      ...current,
      cdnPerformance: undefined,
    }));

    const baseImage = this.imagePerformance()[0];
    const originalSize = baseImage?.size ?? 150000;
    const originalLoadTime = baseImage?.loadTime ?? 600;

    const results: CDNPerformance[] = [];

    for (let i = 0; i < this.cdnProviders.length; i++) {
      const provider = this.cdnProviders[i];

      const simulatedOptimizedSize = Math.round(originalSize * provider.improvementFactor);
      const simulatedLoadTime = originalLoadTime * (0.55 + Math.random() * 0.2);

      results.push({
        provider: provider.name,
        simulatedLoadTime,
        simulatedOriginalSize: originalSize,
        simulatedOptimizedSize,
      });

      this.cdnPerformance.set([...results]);
      this.testProgress.set(((i + 1) / this.cdnProviders.length) * 100);

      await this.delay(600);
    }

    this.analyzeCDNResults();
    this.isTestRunning.set(false);
  }

  resetTests(): void {
    this.imagePerformance.set([]);
    this.cdnPerformance.set([]);
    this.testResults.set({});
    this.testProgress.set(0);
    this.isTestRunning.set(false);
    this.currentAction.set('');
  }

  getImageSize(imageSrc: string): number {
    return this.imagePerformance().find((item) => item.url === imageSrc)?.size ?? 0;
  }

  getImageLoadTime(imageSrc: string): number {
    return this.imagePerformance().find((item) => item.url === imageSrc)?.loadTime ?? 0;
  }

  getResponsiveSrcset(): string {
    return this.responsiveImageSources.map((item) => `${item.src} ${item.width}w`).join(', ');
  }

  getCompressionInfo(format: string): { ratio: string; description: string } {
    switch (format) {
      case 'WebP':
        return {
          ratio: '80-90%',
          description: 'Compresión superior respecto a JPEG.',
        };
      case 'AVIF':
        return {
          ratio: '90-95%',
          description: 'Compresión moderna de muy alta eficiencia.',
        };
      case 'JPEG':
      default:
        return {
          ratio: '60-70%',
          description: 'Formato clásico, generalmente más pesado.',
        };
    }
  }

  getPerformanceClass(loadTime: number): string {
    if (loadTime < 150) return 'excellent';
    if (loadTime < 350) return 'good';
    if (loadTime < 700) return 'fair';
    return 'poor';
  }

  getSavingsClass(savings: number): string {
    if (savings >= 50) return 'excellent';
    if (savings >= 30) return 'good';
    if (savings >= 10) return 'fair';
    return 'poor';
  }

  getCdnPerformanceForProvider(providerName: string): CDNPerformance[] {
    return this.cdnPerformance().filter((item) => item.provider === providerName);
  }

  simulateFontSubset(fontFamily: string): string {
    return `${fontFamily}: ABCDEFGHIJKLMNÑOPQRSTUVWXYZ abcdefghijklmnñopqrstuvwxyz 1234567890`;
  }

  formatBytes(bytes: number): string {
    if (!bytes) return '0 Bytes';

    const units = ['Bytes', 'KB', 'MB'];
    let value = bytes;
    let unitIndex = 0;

    while (value >= 1024 && unitIndex < units.length - 1) {
      value /= 1024;
      unitIndex++;
    }

    return `${value.toFixed(2)} ${units[unitIndex]}`;
  }

  formatTime(ms: number): string {
    return `${ms.toFixed(2)} ms`;
  }

  private analyzeImageResults(): void {
    const imagePerformance = this.imagePerformance();
    const originalImages = imagePerformance.filter((img) => img.format === 'JPEG');
    const optimizedImages = imagePerformance.filter((img) => img.format !== 'JPEG');

    if (!originalImages.length || !optimizedImages.length) {
      return;
    }

    const avgOriginalSize =
      originalImages.reduce((acc, item) => acc + item.size, 0) / originalImages.length;

    const avgOptimizedSize =
      optimizedImages.reduce((acc, item) => acc + item.size, 0) / optimizedImages.length;

    const sizeSavings = ((avgOriginalSize - avgOptimizedSize) / avgOriginalSize) * 100;

    this.testResults.update((current) => ({
      ...current,
      imageOptimization: {
        sizeSavings,
        avgOriginalSize,
        avgOptimizedSize,
      },
    }));
  }

  private analyzeCDNResults(): void {
    const cdnPerformance = this.cdnPerformance();

    if (!cdnPerformance.length) {
      return;
    }

    const avgLoadTime =
      cdnPerformance.reduce((acc, item) => acc + item.simulatedLoadTime, 0) / cdnPerformance.length;

    const avgSizeSavings =
      cdnPerformance.reduce((acc, item) => {
        const savings =
          ((item.simulatedOriginalSize - item.simulatedOptimizedSize) /
            item.simulatedOriginalSize) *
          100;
        return acc + savings;
      }, 0) / cdnPerformance.length;

    this.testResults.update((current) => ({
      ...current,
      cdnPerformance: {
        avgLoadTime,
        avgSizeSavings,
      },
    }));
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
