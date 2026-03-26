import { Component, signal, effect, afterNextRender, Renderer2, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { DOCUMENT } from '@angular/common';
import { UserListComponent } from './components/user-list/user-list.component';
import { HeroComponent } from './components/hero/hero.component';
import { FeaturesComponent } from './components/features/features.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';


export interface EnvironmentConfig {
  appName: string;
  primary: string;
  secondary: string;
  accent: string;
}

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    TranslocoPipe,
    UserListComponent,
    HeroComponent,
    FeaturesComponent,
    FooterComponent,
    NavbarComponent,
    RouterOutlet,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);
  private translocoService = inject(TranslocoService);

  // Signals para colores dinámicos
  readonly primaryColor = signal<string>('#ffca28');
  readonly secondaryColor = signal<string>('#42a5f5');
  readonly accentColor = signal<string>('#66bb6a');
  readonly appName = signal<string>('Firebase Hosting Demo');
  readonly showEnvironmentBadge = signal<boolean>(true);
  readonly environmentName = signal<string>('Firebase');
  readonly activeLang = signal<string>('es');

  // Configuración de entornos
  private readonly environments: Record<string, EnvironmentConfig> = {
    default: {
      appName: 'Práctica curso Firebase Hosting',
      primary: '#ffca28',
      secondary: '#42a5f5',
      accent: '#66bb6a',
    },
    dev: {
      appName: 'Firebase Demo - Desarrollo',
      primary: '#ff5722',
      secondary: '#ff9800',
      accent: '#ffc107',
    },
    prod: {
      appName: 'Firebase Demo - Producción',
      primary: '#4caf50',
      secondary: '#8bc34a',
      accent: '#cddc39',
    },
    fpatino: {
      appName: 'FPatino Environment',
      primary: '#9c27b0',
      secondary: '#e91e63',
      accent: '#f06292',
    },
  };

  constructor() {
    afterNextRender(() => {
      this.loadAppSettings();
      this.initializeInteractions();
      this.initializeLanguage();
    });
  }

  private initializeLanguage(): void {
    // Escuchar cambios de idioma
    this.translocoService.langChanges$.subscribe((lang) => {
      this.activeLang.set(lang);
    });

    // Establecer idioma inicial
    const currentLang = this.translocoService.getActiveLang();
    this.activeLang.set(currentLang);
  }

  public onLanguageChange(value: string): void {
    this.translocoService.setActiveLang(value);
  }

  public onEnvironmentChange(value: string): void {
    this.applyEnvironment(value);
  }

  private applyEnvironment(env: string): void {
    const config = this.environments[env] || this.environments['default'];

    // Actualizar signals
    this.primaryColor.set(config.primary);
    this.secondaryColor.set(config.secondary);
    this.accentColor.set(config.accent);
    this.appName.set(config.appName);
    this.environmentName.set(env.charAt(0).toUpperCase() + env.slice(1));

    // Actualizar CSS variables
    this.updateCSSVariables();
  }

  private updateCSSVariables(): void {
    const root = this.document.documentElement;

    this.renderer.setStyle(root, '--primary-color', this.primaryColor());
    this.renderer.setStyle(root, '--secondary-color', this.secondaryColor());
    this.renderer.setStyle(root, '--accent-color', this.accentColor());

    // Actualizar gradientes
    const gradient1 = `linear-gradient(135deg, ${this.primaryColor()} 0%, ${this.secondaryColor()} 100%)`;
    const gradient2 = `linear-gradient(135deg, ${this.secondaryColor()} 0%, ${this.accentColor()} 100%)`;
    const gradient3 = `linear-gradient(135deg, ${this.accentColor()} 0%, ${this.primaryColor()} 100%)`;

    this.renderer.setStyle(root, '--gradient-1', gradient1);
    this.renderer.setStyle(root, '--gradient-2', gradient2);
    this.renderer.setStyle(root, '--gradient-3', gradient3);
  }

  private initializeInteractions(): void {
    // Efecto para actualizar variables CSS cuando cambian los colores
    effect(() => {
      this.updateCSSVariables();
    });

    // Animación del cursor en terminal
    const cursor = this.document.querySelector('.terminal-cursor') as HTMLElement;
    if (cursor) {
      setInterval(() => {
        const currentOpacity = cursor.style.opacity || '1';
        cursor.style.opacity = currentOpacity === '0' ? '1' : '0';
      }, 500);
    }
  }

  private loadAppSettings(): void {
    // Aplicar configuración por defecto (Firebase)
    this.applyEnvironment('default');
  }

  // Getters para datos de componentes
  public get navbarLinks() {
    return [
      { href: '#home', text: this.translocoService.translate('nav.links.home') },
      { href: '#features', text: this.translocoService.translate('nav.links.features') },
      { href: '#hosting', text: this.translocoService.translate('nav.links.hosting') },
      { href: '#contact', text: this.translocoService.translate('nav.links.contact') },
    ];
  }

  public get environmentOptions() {
    return [
      { value: 'default', label: this.translocoService.translate('nav.environments.default') },
      { value: 'dev', label: this.translocoService.translate('nav.environments.dev') },
      { value: 'prod', label: this.translocoService.translate('nav.environments.prod') },
      { value: 'fpatino', label: this.translocoService.translate('nav.environments.fpatino') },
    ];
  }

  public get heroData() {
    return {
      title: this.translocoService.translate('hero.title'),
      subtitle: this.translocoService.translate('hero.subtitle'),
      description: this.translocoService.translate('hero.description'),
      stats: [
        {
          number: this.translocoService.translate('hero.stats.deployments.number'),
          label: this.translocoService.translate('hero.stats.deployments.label'),
        },
        {
          number: this.translocoService.translate('hero.stats.speed.number'),
          label: this.translocoService.translate('hero.stats.speed.label'),
        },
        {
          number: this.translocoService.translate('hero.stats.ssl.number'),
          label: this.translocoService.translate('hero.stats.ssl.label'),
        },
      ],
      actions: [
        { text: this.translocoService.translate('hero.actions.deploy'), primary: true },
        { text: this.translocoService.translate('hero.actions.docs'), primary: false },
      ],
    };
  }

  public get featuresData() {
    return [
      {
        title: this.translocoService.translate('features.items.performance.title'),
        description: this.translocoService.translate('features.items.performance.description'),
        tech: [
          this.translocoService.translate('features.items.performance.tech.0'),
          this.translocoService.translate('features.items.performance.tech.1'),
          this.translocoService.translate('features.items.performance.tech.2'),
        ],
      },
      {
        title: this.translocoService.translate('features.items.ssl.title'),
        description: this.translocoService.translate('features.items.ssl.description'),
        tech: [
          this.translocoService.translate('features.items.ssl.tech.0'),
          this.translocoService.translate('features.items.ssl.tech.1'),
          this.translocoService.translate('features.items.ssl.tech.2'),
        ],
      },
      {
        title: this.translocoService.translate('features.items.scalability.title'),
        description: this.translocoService.translate('features.items.scalability.description'),
        tech: [
          this.translocoService.translate('features.items.scalability.tech.0'),
          this.translocoService.translate('features.items.scalability.tech.1'),
          this.translocoService.translate('features.items.scalability.tech.2'),
        ],
      },
    ];
  }

  public get footerData() {
    return {
      brandTitle: this.translocoService.translate('footer.brand.title'),
      brandDescription: this.translocoService.translate('footer.brand.description'),
      copyright: this.translocoService.translate('footer.bottom.copyright'),
      linkGroups: [
        {
          title: this.translocoService.translate('footer.links.product.title'),
          links: [
            {
              text: this.translocoService.translate('footer.links.product.items.0'),
              href: '#features',
            },
            {
              text: this.translocoService.translate('footer.links.product.items.1'),
              href: '#hosting',
            },
            {
              text: this.translocoService.translate('footer.links.product.items.2'),
              href: '#pricing',
            },
          ],
        },
        {
          title: this.translocoService.translate('footer.links.resources.title'),
          links: [
            {
              text: this.translocoService.translate('footer.links.resources.items.0'),
              href: '#docs',
            },
            {
              text: this.translocoService.translate('footer.links.resources.items.1'),
              href: '#blog',
            },
            {
              text: this.translocoService.translate('footer.links.resources.items.2'),
              href: '#support',
            },
          ],
        },
        {
          title: this.translocoService.translate('footer.links.company.title'),
          links: [
            {
              text: this.translocoService.translate('footer.links.company.items.0'),
              href: '#about',
            },
            {
              text: this.translocoService.translate('footer.links.company.items.1'),
              href: '#careers',
            },
            {
              text: this.translocoService.translate('footer.links.company.items.2'),
              href: '#contact',
            },
          ],
        },
      ],
    };
  }
}
