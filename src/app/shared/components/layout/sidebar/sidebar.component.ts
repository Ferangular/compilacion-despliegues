import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationItem } from '../../../../core/interfaces/navigation.interface';
import { SidebarService } from '../../../../core/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private router = inject(Router);
  private sidebarService = inject(SidebarService);

  isCollapsed = this.sidebarService.isCollapsed;
  isMobileOpen = signal(false);

  navigationItems: NavigationItem[] = [
    {
      id: 'home',
      label: 'Inicio',
      path: '/',
      icon: '🏠',
      order: 1,
    },
    {
      id: 'list',
      label: 'Listado',
      path: '/list',
      icon: '📋',
      order: 2,
    },
    {
      id: 'detail',
      label: 'Detalle',
      path: '/detail/1',
      icon: '📄',
      order: 3,
    },
    {
      id: 'performance',
      label: 'Laboratorio',
      path: '/performance-lab',
      icon: '⚡',
      order: 4,
    },
    {
      id: 'image-lab',
      label: 'Laboratorio Imágenes',
      path: '/image-lab',
      icon: '🖼️',
      order: 5,
    },
    {
      id: 'asset-optimization',
      label: 'Optimización Assets',
      path: '/asset-optimization',
      icon: '🚀',
      order: 6,
    },
    {
      id: 'contact',
      label: 'Contacto',
      path: '/contact',
      icon: '📧',
      order: 7,
    },
    {
      id: 'settings',
      label: 'Ajustes',
      path: '/settings',
      icon: '⚙️',
      order: 8,
    },
  ];

  currentPath = computed(() => this.router.url);

  toggleCollapse(): void {
    this.sidebarService.toggle();
  }

  closeMobileSidebar(): void {
    this.isMobileOpen.set(false);
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
    this.closeMobileSidebar();
  }

  isActive(path: string): boolean {
    const current = this.currentPath();
    return current === path || (path !== '/' && current.startsWith(path));
  }
}
