import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'Home'
  },
  {
    path: 'list',
    loadComponent: () => import('./features/list/list.component').then(m => m.ListComponent),
    title: 'Listado'
  },
  {
    path: 'detail/:id',
    loadComponent: () => import('./features/detail/detail.component').then(m => m.DetailComponent),
    title: 'Detalle'
  },
  {
    path: 'performance-lab',
    loadComponent: () => import('./features/performance-lab/performance-lab.component').then(m => m.PerformanceLabComponent),
    title: 'Laboratorio de Rendimiento'
  },
  {
    path: 'settings',
    loadComponent: () => import('./features/settings/settings.component').then(m => m.SettingsComponent),
    title: 'Ajustes'
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent),
    title: 'Contacto'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
