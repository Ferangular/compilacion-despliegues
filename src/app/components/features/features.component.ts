import { Component, input } from '@angular/core';

export interface FeatureItem {
  title: string;
  description: string;
  tech: string[];
}

@Component({
  selector: 'app-features',
  standalone: true,
  template: `
    <section class="features">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ title() }}</h2>
          <p class="section-subtitle">{{ subtitle() }}</p>
        </div>
        
        <div class="features-grid" style="grid-template-columns: repeat(columns(), 1fr);">
          @for (feature of features(); track feature.title) {
            <div class="feature-card">
              <div class="feature-icon">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
              </div>
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.description }}</p>
              <div class="feature-tech">
                @for (tech of feature.tech; track tech) {
                  <span class="tech-tag">{{ tech }}</span>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .features {
      padding: 6rem 0;
      background: var(--surface);
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }
    
    .section-header {
      text-align: center;
      margin-bottom: 4rem;
    }
    
    .section-title {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: var(--text-primary);
    }
    
    .section-subtitle {
      font-size: 1.25rem;
      color: var(--text-secondary);
      max-width: 600px;
      margin: 0 auto;
    }
    
    .features-grid {
      display: grid;
      gap: 2rem;
    }
    
    .feature-card {
      background: white;
      padding: 2.5rem;
      border-radius: 16px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      text-align: center;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      border: 1px solid var(--border);
    }
    
    .feature-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }
    
    .feature-icon {
      width: 60px;
      height: 60px;
      margin: 0 auto 1.5rem;
      color: var(--primary-color);
    }
    
    .feature-card h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: var(--text-primary);
    }
    
    .feature-card p {
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
    
    .feature-tech {
      display: flex;
      gap: 0.5rem;
      justify-content: center;
      flex-wrap: wrap;
    }
    
    .tech-tag {
      background: var(--surface);
      color: var(--primary-color);
      padding: 0.25rem 0.75rem;
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 600;
      border: 1px solid var(--border);
    }
    
    @media (max-width: 768px) {
      .features-grid {
        grid-template-columns: 1fr !important;
      }
    }
  `]
})
export class FeaturesComponent {
  readonly title = input<string>('Características Principales');
  readonly subtitle = input<string>('Descubre las funcionalidades que hacen de Firebase Hosting la mejor opción');
  readonly features = input<FeatureItem[]>([]);
  readonly columns = input<number>(3);
}
