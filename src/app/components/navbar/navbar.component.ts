import { Component, signal, input, output } from '@angular/core';

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
  standalone: true,
  template: `
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-brand">
          <div class="logo">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span class="brand-text">{{ brand() }}</span>
        </div>
        
        <!-- Navigation Menu -->
        <div class="nav-menu" [class.active]="isMobileMenuOpen()">
          @for (link of links(); track link.href) {
            <a href="{{ link.href }}" class="nav-link" (click)="closeMobileMenu()">{{ link.text }}</a>
          }
        </div>

        <!-- Language Selector -->
        <div class="language-selector">
          <select (change)="onLanguageSelect($event)" class="lang-select" [value]="activeLanguage()">
            <option value="es">🇪🇸 ES</option>
            <option value="en">🇬🇧 EN</option>
          </select>
        </div>

        <!-- Mobile Menu Toggle -->
        <button
          class="nav-toggle"
          [class.active]="isMobileMenuOpen()"
          (click)="toggleMobileMenu()"
          (keyup)="onKeyup($event)"
          [attr.aria-expanded]="isMobileMenuOpen()"
          [attr.aria-label]="isMobileMenuOpen() ? 'Cerrar menú' : 'Abrir menú'"
          type="button"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      z-index: 1000;
      padding: 1rem 0;
    }
    
    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .nav-brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    
    .logo {
      width: 32px;
      height: 32px;
      color: var(--primary-color, #667eea);
    }
    
    .brand-text {
      font-size: 1.25rem;
      font-weight: 700;
      color: #333;
    }
    
    .nav-menu {
      display: flex;
      gap: 2rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    
    .nav-link {
      text-decoration: none;
      color: #666;
      font-weight: 500;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      transition: all 0.3s ease;
    }
    
    .nav-link:hover {
      color: var(--primary-color, #667eea);
      background-color: rgba(102, 126, 234, 0.1);
    }
    
    .nav-toggle {
      display: none;
      flex-direction: column;
      gap: 4px;
      cursor: pointer;
      background: none;
      border: none;
      padding: 0.5rem;
    }
    
    .nav-toggle span {
      width: 24px;
      height: 2px;
      background: #333;
      transition: all 0.3s ease;
    }
    
    .nav-toggle.active span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
    .nav-toggle.active span:nth-child(2) { opacity: 0; }
    .nav-toggle.active span:nth-child(3) { transform: rotate(-45deg) translate(7px, -6px); }
    
    .language-selector {
      margin-left: 1rem;
    }
    
    .lang-select {
      background: white;
      border: 1px solid #ddd;
      color: #333;
      font-size: 0.875rem;
      font-weight: 500;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      min-width: 80px;
    }
    
    .lang-select:hover {
      border-color: var(--primary-color, #667eea);
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
    
    .lang-select:focus {
      outline: none;
      border-color: var(--primary-color, #667eea);
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
    }
    
    @media (max-width: 768px) {
      .nav-container {
        flex-direction: column;
        gap: 1rem;
      }
      
      .nav-menu {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        flex-direction: column;
        padding: 1rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      
      .nav-menu.active {
        display: flex;
      }
      
      .nav-toggle {
        display: flex;
      }
    }
  `]
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
  readonly environmentOptions = input<EnvironmentOption[]>([]);
  readonly showEnvironmentBadge = input<boolean>(false);
  readonly environmentName = input<string>('');
  readonly activeLanguage = input<string>('es');

  // Outputs para eventos
  readonly environmentChange = output<string>();
  readonly languageChange = output<string>();

  // Estado interno
  private isMobileMenuOpenSignal = signal(false);

  constructor() {}

  // Métodos públicos para el template
  public onLanguageSelect(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const lang = select.value;
    this.languageChange.emit(lang);
  }

  public onEnvironmentSelect(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const env = select.value;
    this.environmentChange.emit(env);
  }

  public toggleMobileMenu(): void {
    this.isMobileMenuOpenSignal.set(!this.isMobileMenuOpenSignal());
  }

  public closeMobileMenu(): void {
    this.isMobileMenuOpenSignal.set(false);
  }

  public onKeyup(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggleMobileMenu();
    }
  }

  // Getter para el template
  public isMobileMenuOpen(): boolean {
    return this.isMobileMenuOpenSignal();
  }
}
