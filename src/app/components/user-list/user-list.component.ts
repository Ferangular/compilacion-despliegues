import { Component, signal, inject, afterNextRender } from '@angular/core';
import { DataService, User } from '../../core/services/data.service';


@Component({
  selector: 'app-user-list',
  standalone: true,
  template: `
    <div class="user-list">
      <h2>📊 Usuarios del Sistema</h2>
      <div class="user-stats">
        <div class="stat-card">
          <span class="stat-number">{{ users().length }}</span>
          <span class="stat-label">Total Usuarios</span>
        </div>
        <div class="stat-card">
          <span class="stat-number">{{ activeUsers() }}</span>
          <span class="stat-label">Usuarios Activos</span>
        </div>
      </div>

      <div class="user-grid">
        @for (user of users(); track user.id) {
          <div class="user-card">
            <div class="user-avatar">
              {{ user.name.charAt(0).toUpperCase() }}
            </div>
            <div class="user-info">
              <h3>{{ user.name }}</h3>
              <p>{{ user.email }}</p>
            </div>
            <div class="user-status">
              <span class="status-badge active">Activo</span>
            </div>
          </div>
        }
      </div>

      @if (loading()) {
        <div class="loading">
          <div class="spinner"></div>
          <p>Cargando usuarios...</p>
        </div>
      }
    </div>
  `,
  styles: [`
    .user-list {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    h2 {
      text-align: center;
      color: #333;
      margin-bottom: 2rem;
      font-size: 2rem;
    }

    .user-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 1.5rem;
      border-radius: 12px;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .stat-number {
      display: block;
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      font-size: 0.9rem;
      opacity: 0.9;
    }

    .user-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .user-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      gap: 1rem;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .user-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    }

    .user-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.2rem;
      flex-shrink: 0;
    }

    .user-info {
      flex: 1;
    }

    .user-info h3 {
      margin: 0 0 0.5rem 0;
      color: #333;
      font-size: 1.1rem;
    }

    .user-info p {
      margin: 0;
      color: #666;
      font-size: 0.9rem;
    }

    .status-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .status-badge.active {
      background: #d4edda;
      color: #155724;
    }

    .loading {
      text-align: center;
      padding: 2rem;
      color: #666;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #667eea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 1rem;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @media (max-width: 768px) {
      .user-grid {
        grid-template-columns: 1fr;
      }

      .user-card {
        flex-direction: column;
        text-align: center;
      }
    }
  `]
})
export class UserListComponent {
  private dataService = inject(DataService);

  users = signal<User[]>([]);
  loading = signal(true);

  activeUsers = signal(0);

  constructor() {
    afterNextRender(() => {
      this.loadUsers();
    });
  }

  private loadUsers() {
    this.loading.set(true);

    // Usar el método loadUsers del DataService que ya maneja el fallback
    this.dataService.loadUsers().subscribe({
      next: (users) => {
        this.users.set(users);
        this.activeUsers.set(users.length);
        this.loading.set(false);
      },
      error: () => {
        // El DataService ya maneja el fallback, pero por si acaso
        const mockUsers = this.dataService.getMockUsers();
        this.users.set(mockUsers);
        this.activeUsers.set(mockUsers.length);
        this.loading.set(false);
      }
    });
  }
}
