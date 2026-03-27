import { Component, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppSettingsService } from '../../../../core/services/app-settings.service';
import { NavigationItem } from '../../../../core/interfaces/navigation.interface';
import { SidebarService } from '../../../../core/services/sidebar.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private router = inject(Router);
  private appSettings = inject(AppSettingsService);
  private sidebarService = inject(SidebarService);

  isSidebarOpen = signal(false);
  
  appConfig = computed(() => this.appSettings.config);

  navigationItems: NavigationItem[] = [
    {
      id: 'home',
      label: 'Inicio',
      path: '/',
      icon: 'home',
      order: 1
    },
    {
      id: 'list',
      label: 'Listado',
      path: '/list',
      icon: 'list',
      order: 2
    },
    {
      id: 'performance',
      label: 'Rendimiento',
      path: '/performance-lab',
      icon: 'speed',
      order: 3
    },
    {
      id: 'contact',
      label: 'Contacto',
      path: '/contact',
      icon: 'mail',
      order: 4
    },
    {
      id: 'settings',
      label: 'Ajustes',
      path: '/settings',
      icon: 'settings',
      order: 5
    }
  ];

  toggleSidebar(): void {
    this.sidebarService.toggle();
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
    if (window.innerWidth <= 768) {
      this.isSidebarOpen.set(false);
    }
  }
}
