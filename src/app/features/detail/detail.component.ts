import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  itemId = computed(() => Number(this.route.snapshot.paramMap.get('id')));

  item = computed(() => ({
    id: this.itemId(),
    title: `Item ${this.itemId()}`,
    description: `Descripción detallada del item ${this.itemId()} con información completa sobre características, especificaciones y datos relevantes para demostrar el funcionamiento del lazy loading y navegación entre componentes.`,
    category: ['Categoría A', 'Categoría B', 'Categoría C'][this.itemId() % 3],
    priority: ['Alta', 'Media', 'Baja'][this.itemId() % 3],
    createdAt: new Date(2024, 0, (this.itemId() % 28) + 1),
    status: ['Activo', 'Pendiente', 'Completado'][this.itemId() % 3],
    tags: [`Tag ${this.itemId()}`, `Demo ${this.itemId() % 5}`, `Test ${this.itemId() % 3}`],
  }));

  goBack(): void {
    this.router.navigate(['/list']);
  }
}
