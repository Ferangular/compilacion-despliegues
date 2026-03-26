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
  standalone: true,
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-brand">
            <h3>{{ brandTitle() }}</h3>
            <p>{{ brandDescription() }}</p>
          </div>
          
          <div class="footer-links">
            @for (group of linkGroups(); track group.title) {
              <div class="link-group">
                <h4>{{ group.title }}</h4>
                @for (link of group.links; track link.text) {
                  <a href="{{ link.href }}">{{ link.text }}</a>
                }
              </div>
            }
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; {{ copyright() }}</p>
          
          @if (showSocial()) {
            <div class="footer-social">
              <a href="#" aria-label="GitHub">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="#" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          }
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
      color: white;
      padding: 3rem 0 1rem;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }
    
    .footer-content {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 3rem;
      margin-bottom: 2rem;
    }
    
    .footer-brand {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .footer-brand h3 {
      font-size: 1.5rem;
      margin: 0;
      color: white;
    }
    
    .footer-brand p {
      opacity: 0.8;
      line-height: 1.6;
      margin: 0;
      color: rgba(255, 255, 255, 0.8);
    }
    
    .footer-links {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }
    
    .link-group h4 {
      font-size: 1rem;
      margin-bottom: 1rem;
      color: white;
      font-weight: 600;
    }
    
    .link-group a {
      display: block;
      color: rgba(255, 255, 255, 0.8);
      text-decoration: none;
      margin-bottom: 0.5rem;
      transition: color 0.3s ease;
    }
    
    .link-group a:hover {
      color: white;
    }
    
    .footer-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: 2rem;
    }
    
    .footer-bottom p {
      margin: 0;
      color: rgba(255, 255, 255, 0.8);
    }
    
    .footer-social {
      display: flex;
      gap: 1rem;
    }
    
    .footer-social a {
      color: rgba(255, 255, 255, 0.8);
      transition: color 0.3s ease;
    }
    
    .footer-social a:hover {
      color: white;
    }
    
    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      
      .footer-links {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
      
      .footer-bottom {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }
    }
  `]
})
export class FooterComponent {
  readonly brandTitle = input<string>('Firebase Hosting Demo');
  readonly brandDescription = input<string>('Plataforma de despliegue moderno para aplicaciones web');
  readonly copyright = input<string>('2024 Firebase Hosting Demo. Todos los derechos reservados.');
  readonly linkGroups = input<FooterLinkGroup[]>([]);
  readonly showSocial = input<boolean>(true);
}
