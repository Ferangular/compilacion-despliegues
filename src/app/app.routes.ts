import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { 
    path: 'home', 
    component: HomeComponent
  },
  // Las otras rutas las crearemos más tarde
  { path: 'features', redirectTo: '/home' },
  { path: 'hosting', redirectTo: '/home' },
  { path: 'contact', redirectTo: '/home' },
  { path: 'users', redirectTo: '/home' },
  { path: '**', redirectTo: '/home' }
];
