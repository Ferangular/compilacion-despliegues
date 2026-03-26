import { Component, inject, afterNextRender } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { DataService } from '../../core/services/data.service';
import { UserListComponent } from '../user-list/user-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TranslocoPipe, UserListComponent],
  template: `
    <main class="main-content">
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">{{ 'hero.title' | transloco }}</h1>
            <p class="hero-subtitle">{{ 'hero.subtitle' | transloco }}</p>
            <p class="hero-description">{{ 'hero.description' | transloco }}</p>

            <div class="hero-stats">
              @for (stat of stats(); track stat.metric_name) {
                <div class="stat">
                  <span class="stat-number">{{ stat.metric_value }}</span>
                  <span class="stat-label">{{ stat.metric_label }}</span>
                </div>
              }
            </div>

            <div class="hero-actions">
              @for (action of heroActions(); track action.text) {
                <button
                  class="btn"
                  [class.btn-primary]="action.primary"
                  [class.btn-outline]="!action.primary"
                >
                  {{ action.text }}
                </button>
              }
            </div>
          </div>

          <div class="terminal">
            <div class="terminal-header">
              <div class="terminal-dots">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
              </div>
              <span class="terminal-title">Terminal</span>
            </div>
            <div class="terminal-body">
              <div class="terminal-line">
                <span class="prompt">$</span>
                <span class="command">docker-compose up -d</span>
              </div>
              <div class="terminal-line">
                <span class="output success">✓ Creating network "app-network"</span>
              </div>
              <div class="terminal-line">
                <span class="output success">✓ Starting postgres-db... done</span>
              </div>
              <div class="terminal-line">
                <span class="output success">✓ Starting node-api... done</span>
              </div>
              <div class="terminal-line">
                <span class="output success">✓ Starting angular-app... done</span>
              </div>
              <div class="terminal-line">
                <span class="prompt">$</span>
                <span class="terminal-cursor"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">{{ 'features.title' | transloco }}</h2>
            <p class="section-subtitle">{{ 'features.subtitle' | transloco }}</p>
          </div>

          <div class="features-grid">
            @for (feature of features(); track feature.id) {
              <div class="feature-card">
                <div class="feature-icon">
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
                <h3>{{ feature.title }}</h3>
                <p>{{ feature.description }}</p>
                <div class="feature-tech">
                  <span class="tech-tag">{{ feature.category }}</span>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Users Section -->
      <section class="users-section">
        <div class="container">
          <app-user-list />
        </div>
      </section>
    </main>
  `,
  styles: [
    `
      .main-content {
        padding-top: 80px; /* Espacio para el navbar fijo */
      }

      .hero {
        min-height: 100vh;
        display: flex;
        align-items: center;
        padding: 6rem 0 4rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        overflow: hidden;
        position: relative;
      }

      .hero::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background:
          radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 40% 20%, rgba(255, 255, 255, 0.08) 0%, transparent 50%);
        pointer-events: none;
      }

      .hero-content {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
        align-items: center;
        position: relative;
        z-index: 1;
      }

      .hero-text {
        animation: fadeInUp 1s ease-out;
      }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .hero-title {
        font-size: 4rem;
        font-weight: 800;
        line-height: 1.1;
        margin-bottom: 1.5rem;
        background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .hero-subtitle {
        font-size: 1.5rem;
        margin-bottom: 2rem;
        opacity: 0.9;
        line-height: 1.6;
        font-weight: 300;
      }

      .hero-description {
        font-size: 1.1rem;
        margin-bottom: 2rem;
        opacity: 0.8;
        line-height: 1.6;
      }

      .hero-stats {
        display: flex;
        gap: 2rem;
        margin-bottom: 2rem;
      }

      .stat {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        padding: 1.5rem;
        border-radius: 16px;
        text-align: center;
        border: 1px solid rgba(255, 255, 255, 0.2);
        transition:
          transform 0.3s ease,
          box-shadow 0.3s ease;
      }

      .stat:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      }

      .stat-number {
        display: block;
        font-size: 2.5rem;
        font-weight: 700;
        color: #ffd700;
        margin-bottom: 0.5rem;
      }

      .stat-label {
        font-size: 0.9rem;
        opacity: 0.9;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .hero-actions {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
      }

      .btn {
        padding: 1rem 2rem;
        border: none;
        border-radius: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 1rem;
        position: relative;
        overflow: hidden;
      }

      .btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s ease;
      }

      .btn:hover::before {
        left: 100%;
      }

      .btn-primary {
        background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
        color: #333;
        box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
      }

      .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(255, 215, 0, 0.4);
      }

      .btn-outline {
        background: transparent;
        color: white;
        border: 2px solid rgba(255, 255, 255, 0.3);
        backdrop-filter: blur(10px);
      }

      .btn-outline:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.5);
        transform: translateY(-2px);
      }

      .terminal {
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        border-radius: 20px;
        overflow: hidden;
        box-shadow:
          0 25px 50px -12px rgba(0, 0, 0, 0.5),
          0 0 0 1px rgba(255, 255, 255, 0.1);
        width: 100%;
        max-width: 550px;
        animation: float 6s ease-in-out infinite;
      }

      @keyframes float {
        0%,
        100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-10px);
        }
      }

      .terminal-header {
        background: rgba(255, 255, 255, 0.05);
        padding: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        backdrop-filter: blur(10px);
      }

      .terminal-dots {
        display: flex;
        gap: 0.5rem;
      }

      .dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      }

      .dot.red {
        background: linear-gradient(135deg, #ff5f57 0%, #ff3b30 100%);
      }

      .dot.yellow {
        background: linear-gradient(135deg, #ffbd2e 0%, #ff9500 100%);
      }

      .dot.green {
        background: linear-gradient(135deg, #28ca42 0%, #00d084 100%);
      }

      .terminal-title {
        color: rgba(255, 255, 255, 0.7);
        font-size: 0.875rem;
        font-family: 'SF Mono', 'Monaco', 'Inconsolata', monospace;
        font-weight: 500;
      }

      .terminal-body {
        padding: 2rem;
        font-family: 'SF Mono', 'Monaco', 'Inconsolata', monospace;
        font-size: 0.9rem;
        line-height: 1.6;
      }

      .terminal-line {
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        opacity: 0;
        animation: fadeIn 0.5s ease-out forwards;
      }

      .terminal-line:nth-child(1) {
        animation-delay: 0.2s;
      }

      .terminal-line:nth-child(2) {
        animation-delay: 0.4s;
      }

      .terminal-line:nth-child(3) {
        animation-delay: 0.6s;
      }

      .terminal-line:nth-child(4) {
        animation-delay: 0.8s;
      }

      .terminal-line:nth-child(5) {
        animation-delay: 1s;
      }

      .terminal-line:nth-child(6) {
        animation-delay: 1.2s;
      }

      @keyframes fadeIn {
        to {
          opacity: 1;
        }
      }

      .prompt {
        color: #00d084;
        margin-right: 0.75rem;
        font-weight: 600;
      }

      .command {
        color: #ffffff;
        font-weight: 500;
      }

      .output {
        color: rgba(255, 255, 255, 0.7);
        margin-left: 1.5rem;
      }

      .output.success {
        color: #00d084;
        font-weight: 600;
      }

      .terminal-cursor {
        display: inline-block;
        width: 8px;
        height: 18px;
        background: linear-gradient(135deg, #ffffff 0%, #ffd700 100%);
        border-radius: 2px;
        animation: blink 1s infinite;
      }

      @keyframes blink {
        0%,
        50% {
          opacity: 1;
        }
        51%,
        100% {
          opacity: 0;
        }
      }

      .features {
        padding: 6rem 0;
        background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
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
        color: var(--text-primary, #333);
      }

      .section-subtitle {
        font-size: 1.25rem;
        color: var(--text-secondary, #666);
        max-width: 600px;
        margin: 0 auto;
      }

      .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 2rem;
      }

      .feature-card {
        background: white;
        padding: 2.5rem;
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        text-align: center;
        transition:
          transform 0.3s ease,
          box-shadow 0.3s ease;
        border: 1px solid rgba(102, 126, 234, 0.1);
      }

      .feature-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
      }

      .feature-icon {
        width: 60px;
        height: 60px;
        margin: 0 auto 1.5rem;
        color: var(--primary-color, #667eea);
      }

      .feature-card h3 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: var(--text-primary, #333);
      }

      .feature-card p {
        color: var(--text-secondary, #666);
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
        background: var(--surface, #f8f9fa);
        color: var(--primary-color, #667eea);
        padding: 0.25rem 0.75rem;
        border-radius: 999px;
        font-size: 0.75rem;
        font-weight: 600;
        border: 1px solid var(--border, #ddd);
      }

      .users-section {
        padding: 4rem 0;
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      }

      @media (max-width: 768px) {
        .hero-content {
          grid-template-columns: 1fr;
          gap: 2rem;
          text-align: center;
        }

        .hero-title {
          font-size: 2.5rem;
        }

        .hero-stats {
          justify-content: center;
          flex-wrap: wrap;
        }

        .hero-actions {
          justify-content: center;
        }

        .terminal {
          max-width: 100%;
        }

        .features-grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class HomeComponent {
  private dataService = inject(DataService);

  stats = this.dataService.getStats();
  features = this.dataService.getFeatures();

  heroActions() {
    return [
      { text: 'Iniciar Docker', primary: true },
      { text: 'Ver Documentación', primary: false },
    ];
  }

  constructor() {
    afterNextRender(() => {
      // Cargar datos de la API
      this.dataService.loadStats();
      this.dataService.loadFeatures();
    });
  }
}
