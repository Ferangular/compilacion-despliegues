import { Component, signal, computed } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-performance-lab',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './performance-lab.component.html',
  styleUrl: './performance-lab.component.scss',
})
export class PerformanceLabComponent {
  isMonitoring = signal(false);
  metrics = signal({
    loadTime: 0,
    renderTime: 0,
    bundleSize: 0,
    memoryUsage: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
  });

  performanceTips = [
    {
      title: 'Lazy Loading',
      description: 'Carga componentes solo cuando se necesitan',
      implemented: true,
      impact: 'Alto',
    },
    {
      title: 'Tree Shaking',
      description: 'Elimina código no utilizado del bundle',
      implemented: true,
      impact: 'Alto',
    },
    {
      title: 'Code Splitting',
      description: 'Divide el código en chunks más pequeños',
      implemented: true,
      impact: 'Medio',
    },
    {
      title: 'Signals + Zoneless',
      description: 'Reduce overhead de change detection',
      implemented: false,
      impact: 'Medio',
    },
    {
      title: 'Optimización de Imágenes',
      description: 'WebP, lazy loading, CDN',
      implemented: false,
      impact: 'Medio',
    },
    {
      title: 'Cache Strategy',
      description: 'Headers de caché y service workers',
      implemented: false,
      impact: 'Alto',
    },
  ];

  startMonitoring(): void {
    this.isMonitoring.set(true);
    this.simulateMetrics();
  }

  stopMonitoring(): void {
    this.isMonitoring.set(false);
  }

  private simulateMetrics(): void {
    if (!this.isMonitoring()) return;

    this.metrics.set({
      loadTime: Math.random() * 50 + 10,
      renderTime: Math.random() * 20 + 5,
      bundleSize: Math.random() * 100 + 50,
      memoryUsage: Math.random() * 50 + 20,
      firstContentfulPaint: Math.random() * 30 + 15,
      largestContentfulPaint: Math.random() * 40 + 20,
    });

    setTimeout(() => this.simulateMetrics(), 2000);
  }
}
