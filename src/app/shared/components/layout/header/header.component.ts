import { Component, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppSettingsService } from '../../../../core/services/app-settings.service';
import { NavigationItem } from '../../../../core/interfaces/navigation.interface';
import { SidebarService } from '../../../../core/services/sidebar.service';
import {  TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  router = inject(Router);
  private appSettings = inject(AppSettingsService);
  private sidebarService = inject(SidebarService);
  private translocoService = inject(TranslocoService);

  isSidebarOpen = signal(false);

  appConfig = computed(() => this.appSettings.config);

  // Idiomas disponibles
  availableLanguages = [
    { code: 'es', name: 'ES', flag: '🇪🇸' },
    { code: 'en', name: 'EN', flag: '🇬🇧' },
  ];

  currentLanguage = toSignal(
    this.translocoService.langChanges$.pipe(
      map(lang => {
        console.log('Idioma actualizado:', lang);
        return lang;
      })
    )
  );

  // Signal para las traducciones que se actualiza cuando cambia el idioma
  translations = toSignal(
    this.translocoService.selectTranslateObject('navigation').pipe(
      map(translations => {
        console.log('Traducciones de navigation actualizadas:', translations);
        return translations;
      })
    ),
    { initialValue: {} }
  );

  // Método para obtener traducciones directamente
  getTranslation(key: string): string {
    console.log('Traducción para:', key);
    const result = this.translocoService.translate(key);
    console.log('Resultado:', result);
    console.log('Idioma actual:', this.translocoService.getActiveLang());
    return result;
  }

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
      id: 'performance',
      label: 'Rendimiento',
      path: '/performance-lab',
      icon: '⚡',
      order: 3,
    },
    {
      id: 'contact',
      label: 'Contacto',
      path: '/contact',
      icon: '📧',
      order: 4,
    },
    {
      id: 'settings',
      label: 'Ajustes',
      path: '/settings',
      icon: '⚙️',
      order: 5,
    },
  ];

  toggleSidebar(): void {
    this.sidebarService.toggle();
  }

  changeLanguage(languageCode: string): void {
    console.log('Cambiando idioma a:', languageCode);
    this.translocoService.setActiveLang(languageCode);
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
    if (window.innerWidth <= 768) {
      this.isSidebarOpen.set(false);
    }
  }
}
