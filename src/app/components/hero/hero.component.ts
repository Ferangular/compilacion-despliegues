import { Component, input } from '@angular/core';


export interface HeroStats {
  number: string;
  label: string;
}

export interface HeroAction {
  text: string;
  icon?: string;
  primary?: boolean;
}

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  // Inputs configurables
  readonly title = input<string>('Firebase Hosting');
  readonly subtitle = input<string>('Demo Profesional');
  readonly description = input<string>('Despliega aplicaciones Angular modernas con Firebase Hosting.');
  readonly stats = input<HeroStats[]>([
    { number: '100%', label: 'Uptime' },
    { number: '99.9%', label: 'Rendimiento' },
    { number: '∞', label: 'SSL Gratis' }
  ]);
  readonly actions = input<HeroAction[]>([
    { text: 'Desplegar Ahora', primary: true },
    { text: 'Ver Documentación', primary: false }
  ]);
  readonly showTerminal = input<boolean>(true);
}
