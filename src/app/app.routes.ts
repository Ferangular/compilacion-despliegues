import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
    title: 'Home',
  },
  {
    path: 'list',
    loadComponent: () => import('./features/list/list.component').then((m) => m.ListComponent),
    title: 'Listado',
  },
  {
    path: 'detail/:id',
    loadComponent: () =>
      import('./features/detail/detail.component').then((m) => m.DetailComponent),
    title: 'Detalle',
  },
  {
    path: 'performance-lab',
    loadComponent: () =>
      import('./features/performance-lab/performance-lab.component').then(
        (m) => m.PerformanceLabComponent,
      ),
    title: 'Laboratorio de Rendimiento',
  },
  {
    path: 'image-lab',
    loadComponent: () =>
      import('./features/image-lab/image-lab.component').then((m) => m.ImageLabComponent),
    title: 'Laboratorio de Imágenes',
  },
  {
    path: 'asset-optimization',
    loadComponent: () =>
      import('./features/asset-optimization/asset-optimization').then((m) => m.AssetOptimization),
    title: 'Optimización de Assets',
  },
  {
    path: 'signals-demo',
    loadComponent: () => import('./features/signals-demo/signals-demo').then((m) => m.SignalsDemo),
    title: 'Signals Zoneless Demo',
  },
  {
    path: 'performance-benchmark',
    loadComponent: () =>
      import('./features/performance-benchmark/performance-benchmark').then(
        (m) => m.PerformanceBenchmark,
      ),
    title: 'Performance Benchmark',
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./features/settings/settings.component').then((m) => m.SettingsComponent),
    title: 'Ajustes',
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/contact/contact.component').then((m) => m.ContactComponent),
    title: 'Contacto',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
