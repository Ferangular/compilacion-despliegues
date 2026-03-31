import { ChangeDetectionStrategy, Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-signals-demo',
  imports: [],
  templateUrl: './signals-demo.html',
  styleUrl: './signals-demo.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalsDemo {
  // Signals primitivos - O(k) complexity
  readonly count = signal(0);
  readonly name = signal('Angular Zoneless');
  readonly items = signal(['Item 1', 'Item 2', 'Item 3']);

  // Signals computados - solo se actualizan cuando sus dependencias cambian
  readonly doubleCount = computed(() => this.count() * 2);
  readonly itemCount = computed(() => this.items().length);
  readonly greeting = computed(() => `Hello, ${this.name()}!`);

  // Effect para side effects (logging, API calls, etc.)
  private countEffect = effect(() => {
    console.log(`Count changed to: ${this.count()}`);
  });

  // Métodos para actualizar signals
  increment(): void {
    this.count.update((current) => current + 1);
  }

  decrement(): void {
    this.count.update((current) => current - 1);
  }

  reset(): void {
    this.count.set(0);
  }

  updateName(newName: string): void {
    this.name.set(newName);
  }

  addItem(item: string): void {
    this.items.update((current) => [...current, item]);
  }

  removeItem(index: number): void {
    this.items.update((current) => current.filter((_, i) => i !== index));
  }
}
