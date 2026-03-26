import { Component, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

export interface FeatureItem {
  title: string;
  description: string;
  tech: string[];
  icon?: string;
}

@Component({
  selector: 'app-features',
  imports: [TranslocoPipe],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss'
})
export class FeaturesComponent {
  // Inputs configurables
  readonly title = input<string>('Características Principales');
  readonly subtitle = input<string>('Todo lo que necesitas para despliegues profesionales');
  readonly features = input<FeatureItem[]>([
    {
      title: 'Rendimiento Superior',
      description: 'CDN global con caché inteligente para tiempos de carga mínimos.',
      tech: ['CDN', 'Cache', 'HTTP/2']
    },
    {
      title: 'Seguridad Integrada',
      description: 'SSL gratuito, firewall y protección contra ataques DDoS.',
      tech: ['SSL', 'Firewall', 'DDoS']
    },
    {
      title: 'Escalabilidad Infinita',
      description: 'Escala automáticamente con el tráfico de tu aplicación.',
      tech: ['Auto-scaling', 'Load Balancer', 'Global']
    }
  ]);
  readonly columns = input<number>(3);
}
