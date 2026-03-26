import { Component, signal, afterNextRender, inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { FeaturesComponent } from './components/features/features.component';
import { FooterComponent } from './components/footer/footer.component';

interface EnvironmentConfig {
  primary: string;
  secondary: string;
  accent: string;
  appName: string;
  environmentName: string;
}

@Component({
  selector: 'app-root',
  imports: [
    TranslocoPipe,
    NavbarComponent,
    HeroComponent,
    FeaturesComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Firebase Hosting Demo');
  protected readonly activeLang = signal('es');

  // Signals para colores dinámicos
  protected readonly primaryColor = signal('#ffca28');
  protected readonly secondaryColor = signal('#42a5f5');
  protected readonly accentColor = signal('#66bb6a');
  protected readonly appName = signal('Firebase Hosting Demo');
  protected readonly environmentName = signal('Firebase');
  protected readonly showEnvironmentBadge = signal(true);
  protected readonly logo = signal('assets/icons/logo-default.svg');

  private readonly document = inject(DOCUMENT);
  private readonly renderer = inject(Renderer2);
  private readonly translocoService = inject(TranslocoService);

  // Configuraciones de entornos tipadas
  private readonly environments: Record<string, EnvironmentConfig> = {
    default: {
      primary: '#ffca28',
      secondary: '#42a5f5',
      accent: '#66bb6a',
      appName: 'Firebase Hosting Demo',
      environmentName: 'Firebase'
    },
    dev: {
      primary: '#1565c0',
      secondary: '#42a5f5',
      accent: '#90caf9',
      appName: 'Compilación y Despliegues',
      environmentName: 'Desarrollo'
    },
    prod: {
      primary: '#2e7d32',
      secondary: '#66bb6a',
      accent: '#c8e6c9',
      appName: 'Compilación y Despliegues',
      environmentName: 'Producción'
    },
    fpatino: {
      primary: '#6a1b9a',
      secondary: '#ab47bc',
      accent: '#e1bee7',
      appName: 'Compilación y Despliegues',
      environmentName: 'FPatino Local'
    }
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
    this.translocoService.langChanges$.subscribe(lang => {
      console.log('Idioma cambiado a:', lang); // Debug
      this.activeLang.set(lang);
    });
    
    // Establecer idioma inicial
    const currentLang = this.translocoService.getActiveLang();
    console.log('Idioma actual:', currentLang); // Debug
    this.activeLang.set(currentLang);
  }

  public onLanguageChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const lang = select.value;
    console.log('Cambiando idioma a:', lang); // Debug
    this.translocoService.setActiveLang(lang);
  }

  public onEnvironmentChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const env = select.value;
    this.applyEnvironment(env);
  }

  private applyEnvironment(env: string): void {
    const config = this.environments[env] || this.environments['default'];

    // Actualizar signals
    this.primaryColor.set(config.primary);
    this.secondaryColor.set(config.secondary);
    this.accentColor.set(config.accent);
    this.appName.set(config.appName);
    this.environmentName.set(config.environmentName);

    // Aplicar colores dinámicamente via CSS variables
    this.updateCSSVariables();
  }

  private loadAppSettings(): void {
    // Aplicar configuración por defecto (Firebase)
    this.applyEnvironment('default');
  }

  private updateCSSVariables(): void {
    const root = this.document.documentElement;

    // Actualizar CSS variables con los colores del entorno
    this.renderer.setStyle(root, '--primary-color', this.primaryColor());
    this.renderer.setStyle(root, '--secondary-color', this.secondaryColor());
    this.renderer.setStyle(root, '--accent-color', this.accentColor());

    // Crear gradientes dinámicos
    const gradient1 = `linear-gradient(135deg, ${this.primaryColor()} 0%, ${this.secondaryColor()} 100%)`;
    const gradient2 = `linear-gradient(135deg, ${this.secondaryColor()} 0%, ${this.accentColor()} 100%)`;
    const gradient3 = `linear-gradient(135deg, ${this.accentColor()} 0%, ${this.primaryColor()} 100%)`;

    this.renderer.setStyle(root, '--gradient-1', gradient1);
    this.renderer.setStyle(root, '--gradient-2', gradient2);
    this.renderer.setStyle(root, '--gradient-3', gradient3);
  }

  private initializeInteractions(): void {
    // Smooth scrolling para enlaces internos
    this.document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      this.renderer.listen(anchor, 'click', (event: Event) => {
        event.preventDefault();
        const targetId = (anchor as HTMLAnchorElement).getAttribute('href');
        if (targetId) {
          const target = this.document.querySelector(targetId);
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });

    // Terminal cursor animation
    this.startTerminalCursorAnimation();
  }

  private startTerminalCursorAnimation(): void {
    const cursor = this.document.querySelector('.terminal-cursor') as HTMLElement;
    if (cursor) {
      setInterval(() => {
        const currentOpacity = cursor.style.opacity || '1';
        cursor.style.opacity = currentOpacity === '0' ? '1' : '0';
      }, 500);
    }
  }

  // Getters para datos de componentes
  public get navbarLinks() {
    return [
      { href: '#home', text: this.translocoService.translate('nav.links.home') },
      { href: '#features', text: this.translocoService.translate('nav.links.features') },
      { href: '#hosting', text: this.translocoService.translate('nav.links.hosting') },
      { href: '#contact', text: this.translocoService.translate('nav.links.contact') }
    ];
  }

  public get environmentOptions() {
    return [
      { value: 'default', label: this.translocoService.translate('nav.environments.default') },
      { value: 'dev', label: this.translocoService.translate('nav.environments.dev') },
      { value: 'prod', label: this.translocoService.translate('nav.environments.prod') },
      { value: 'fpatino', label: this.translocoService.translate('nav.environments.fpatino') }
    ];
  }

  public get heroData() {
    return {
      title: this.translocoService.translate('hero.title'),
      subtitle: this.translocoService.translate('hero.subtitle'),
      description: this.translocoService.translate('hero.description'),
      stats: [
        { number: this.translocoService.translate('hero.stats.deployments.number'), label: this.translocoService.translate('hero.stats.deployments.label') },
        { number: this.translocoService.translate('hero.stats.speed.number'), label: this.translocoService.translate('hero.stats.speed.label') },
        { number: this.translocoService.translate('hero.stats.ssl.number'), label: this.translocoService.translate('hero.stats.ssl.label') }
      ],
      actions: [
        { text: this.translocoService.translate('hero.actions.deploy'), primary: true },
        { text: this.translocoService.translate('hero.actions.docs'), primary: false }
      ]
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
          this.translocoService.translate('features.items.performance.tech.2')
        ]
      },
      {
        title: this.translocoService.translate('features.items.security.title'),
        description: this.translocoService.translate('features.items.security.description'),
        tech: [
          this.translocoService.translate('features.items.security.tech.0'),
          this.translocoService.translate('features.items.security.tech.1'),
          this.translocoService.translate('features.items.security.tech.2')
        ]
      },
      {
        title: this.translocoService.translate('features.items.scalability.title'),
        description: this.translocoService.translate('features.items.scalability.description'),
        tech: [
          this.translocoService.translate('features.items.scalability.tech.0'),
          this.translocoService.translate('features.items.scalability.tech.1'),
          this.translocoService.translate('features.items.scalability.tech.2')
        ]
      }
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
            { text: this.translocoService.translate('footer.links.product.items.0'), href: '#features' },
            { text: this.translocoService.translate('footer.links.product.items.1'), href: '#hosting' },
            { text: this.translocoService.translate('footer.links.product.items.2'), href: '#' }
          ]
        },
        {
          title: this.translocoService.translate('footer.links.company.title'),
          links: [
            { text: this.translocoService.translate('footer.links.company.items.0'), href: '#' },
            { text: this.translocoService.translate('footer.links.company.items.1'), href: '#' },
            { text: this.translocoService.translate('footer.links.company.items.2'), href: '#' }
          ]
        },
        {
          title: this.translocoService.translate('footer.links.support.title'),
          links: [
            { text: this.translocoService.translate('footer.links.support.items.0'), href: '#' },
            { text: this.translocoService.translate('footer.links.support.items.1'), href: '#contact' },
            { text: this.translocoService.translate('footer.links.support.items.2'), href: '#' }
          ]
        }
      ]
    };
  }
}
