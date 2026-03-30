import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/layout/header/header.component';
import { SidebarComponent } from './shared/components/layout/sidebar/sidebar.component';
import { FooterComponent } from './shared/components/layout/footer/footer.component';
import { AppSettingsService } from './core/services/app-settings.service';
import { SidebarService } from './core/services/sidebar.service';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    TranslocoPipe
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private appSettings = inject(AppSettingsService);
  private sidebarService = inject(SidebarService);

  appConfig = computed(() => this.appSettings.config);
  isSidebarCollapsed = this.sidebarService.isCollapsed;
  isFooterVisible = signal(true); // Estado para controlar visibilidad del footer

  toggleSidebar(): void {
    this.sidebarService.toggle();
  }

  toggleFooter(): void {
    this.isFooterVisible.update(visible => !visible);
  }
}
