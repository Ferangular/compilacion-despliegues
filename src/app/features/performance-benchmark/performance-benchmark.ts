import { ChangeDetectionStrategy, Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-performance-benchmark',
  standalone: true,
  imports: [],
  templateUrl: './performance-benchmark.html',
  styleUrl: './performance-benchmark.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PerformanceBenchmark {
  // Signals para el benchmark
  readonly itemCount = signal(1000);
  readonly updateInterval = signal(100);
  readonly isRunning = signal(false);
  readonly iterations = signal(0);
  readonly totalTime = signal(0);
  readonly avgTime = signal(0);
  readonly benchmarkDuration = signal(0);

  // Datos para la simulación
  readonly items = signal<{ id: number; value: string; timestamp: number }[]>([]);

  // Computados
  readonly itemCountDisplay = computed(() => this.items().length);
  readonly performanceStats = computed(() => ({
    iterations: this.iterations(),
    totalTime: this.totalTime(),
    avgTime: this.avgTime(),
    itemCount: this.itemCountDisplay(),
    benchmarkDuration: this.benchmarkDuration(),
  }));

  private intervalId: number | null = null;
  private benchmarkStartTime: number | null = null;

  constructor() {
    // Inicializar items
    this.initializeItems();

    // Effect para logging
    effect(() => {
      if (this.isRunning()) {
        console.log('🚀 Benchmark started with Zoneless + Signals');
      } else {
        console.log('⏹️ Benchmark stopped');
      }
    });
  }

  private initializeItems(): void {
    const items = Array.from({ length: this.itemCount() }, (_, i) => ({
      id: i,
      value: `Item ${i}`,
      timestamp: Date.now(),
    }));
    this.items.set(items);
  }

  startBenchmark(): void {
    if (this.isRunning()) return;

    this.isRunning.set(true);
    this.iterations.set(0);
    this.totalTime.set(0);
    this.avgTime.set(0);
    this.benchmarkDuration.set(0);

    this.benchmarkStartTime = performance.now();

    this.intervalId = setInterval(() => {
      const iterationStart = performance.now();

      // Actualizar items aleatoriamente - esto solo afectará a los bindings que consumen los signals
      this.items.update((current) => {
        const updated = [...current];
        const randomIndex = Math.floor(Math.random() * updated.length);
        updated[randomIndex] = {
          ...updated[randomIndex],
          value: `Updated ${randomIndex} at ${Date.now()}`,
          timestamp: Date.now(),
        };
        return updated;
      });

      const iterationEnd = performance.now();
      const iterationTime = iterationEnd - iterationStart;

      this.iterations.update((i) => i + 1);
      this.totalTime.update((t) => t + iterationTime);
      this.avgTime.set(this.totalTime() / this.iterations());

      // Detener después de 100 iteraciones
      if (this.iterations() >= 100) {
        this.stopBenchmark();
      }
    }, this.updateInterval());
  }

  stopBenchmark(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    if (this.benchmarkStartTime) {
      const endTime = performance.now();
      this.benchmarkDuration.set(endTime - this.benchmarkStartTime);
      this.benchmarkStartTime = null;
    }

    this.isRunning.set(false);
  }

  resetBenchmark(): void {
    this.stopBenchmark();
    this.iterations.set(0);
    this.totalTime.set(0);
    this.avgTime.set(0);
    this.benchmarkDuration.set(0);
    this.initializeItems();
  }

  updateItemCount(count: number): void {
    this.itemCount.set(count);
    this.initializeItems();
  }

  // Método para simular operaciones pesadas
  heavyComputation(): void {
    const start = performance.now();

    // Simular computación pesada
    for (let i = 0; i < 1000000; i++) {
      Math.random();
    }

    const end = performance.now();
    console.log(`Heavy computation took: ${end - start}ms`);
  }

  // Método para probar reactividad con múltiples signals
  testMultipleSignals(): void {
    const signal1 = signal(0);
    const signal2 = signal(0);
    const signal3 = signal(0);

    const computed1 = computed(() => signal1() * 2);
    const computed2 = computed(() => signal2() + signal3());
    const computed3 = computed(() => computed1() + computed2());

    const start = performance.now();

    // Actualizar signals múltiples veces
    for (let i = 0; i < 1000; i++) {
      signal1.set(i);
      signal2.set(i * 2);
      signal3.set(i * 3);
    }

    const end = performance.now();
    console.log(`Multiple signals test took: ${end - start}ms, final result: ${computed3()}`);
  }
}
