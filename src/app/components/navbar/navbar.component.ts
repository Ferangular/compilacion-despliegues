import { Component, signal, input, output } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

export interface NavbarLink {
  href: string;
  text: string;
}

export interface EnvironmentOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-navbar',
  imports: [TranslocoPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  // Inputs con valores por defecto
  readonly brand = input<string>('Firebase Demo');
  readonly links = input<NavbarLink[]>([
    { href: '#home', text: 'Inicio' },
    { href: '#features', text: 'Características' },
    { href: '#hosting', text: 'Hosting' },
    { href: '#contact', text: 'Contacto' }
  ]);
  readonly environmentOptions = input<EnvironmentOption[]>([
    { value: 'default', label: 'Firebase' },
    { value: 'dev', label: 'Desarrollo' },
    { value: 'prod', label: 'Producción' },
    { value: 'fpatino', label: 'FPatino' }
  ]);
  readonly showEnvironmentBadge = input<boolean>(true);
  readonly environmentName = input<string>('Firebase');
  readonly activeLanguage = input<string>('es');

  // Outputs para eventos usando output()
  readonly environmentChange = output<string>();
  readonly languageChange = output<string>();

  // Signals internos para estado
  protected readonly isMobileMenuOpen = signal(false);

  // Métodos públicos
  public onEnvironmentSelect(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.environmentChange.emit(select.value);
  }

  public onLanguageSelect(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const lang = select.value;
    console.log('Navbar: Emitiendo cambio de idioma:', lang); // Debug
    this.languageChange.emit(lang);
  }

  public onKeyup(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggleMobileMenu();
    }
  }

  public toggleMobileMenu(): void {
    this.isMobileMenuOpen.set(!this.isMobileMenuOpen());
  }

  public closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }
}
