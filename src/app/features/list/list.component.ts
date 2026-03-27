import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  private router = inject(Router);

  items = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `Item ${i + 1}`,
    description: `Descripción del item ${i + 1} - Demostración de lazy loading y rendimiento`,
    category: ['Categoría A', 'Categoría B', 'Categoría C'][i % 3],
    priority: ['Alta', 'Media', 'Baja'][i % 3]
  }));

  navigateToDetail(id: number): void {
    this.router.navigate(['/detail', id]);
  }
}
