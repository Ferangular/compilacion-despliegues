import { Component, input } from '@angular/core';


export interface FooterLink {
  text: string;
  href: string;
}

export interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  // Inputs configurables
  readonly brandTitle = input<string>('Firebase Demo');
  readonly brandDescription = input<string>('Plataforma de despliegue profesional para aplicaciones Angular modernas.');
  readonly copyright = input<string>('© 2024 Firebase Demo. Todos los derechos reservados.');
  readonly linkGroups = input<FooterLinkGroup[]>([
    {
      title: 'Producto',
      links: [
        { text: 'Características', href: '#features' },
        { text: 'Precios', href: '#' },
        { text: 'Documentación', href: '#' }
      ]
    },
    {
      title: 'Empresa',
      links: [
        { text: 'Sobre Nosotros', href: '#' },
        { text: 'Blog', href: '#' },
        { text: 'Carreras', href: '#' }
      ]
    },
    {
      title: 'Soporte',
      links: [
        { text: 'Ayuda', href: '#' },
        { text: 'Contacto', href: '#contact' },
        { text: 'Estado', href: '#' }
      ]
    }
  ]);
  readonly showSocial = input<boolean>(true);
}
