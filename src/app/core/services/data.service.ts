import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
  is_active: boolean;
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
  category: string;
}

export interface Stat {
  metric_name: string;
  metric_value: string;
  metric_label: string;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly API_BASE_URL = 'http://localhost:3000/api';
  
  private users = signal<User[]>([]);
  private features = signal<Feature[]>([]);
  private stats = signal<Stat[]>([]);
  private loading = signal<boolean>(false);
  private error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  // Métodos para Usuarios
  loadUsers(): Observable<User[]> {
    this.loading.set(true);
    this.error.set(null);
    
    return this.http.get<User[]>(`${this.API_BASE_URL}/users`).pipe(
      tap(users => {
        this.users.set(users);
        this.loading.set(false);
      }),
      catchError(error => {
        console.error('Error cargando usuarios:', error);
        this.error.set('No se pudieron cargar los usuarios');
        this.loading.set(false);
        // Fallback a datos mock
        const mockUsers = this.getMockUsers();
        this.users.set(mockUsers);
        return of(mockUsers);
      })
    );
  }

  createUser(userData: { name: string; email: string; role?: string }): Observable<User> {
    return this.http.post<User>(`${this.API_BASE_URL}/users`, userData).pipe(
      tap(newUser => {
        const currentUsers = this.users();
        this.users.set([newUser, ...currentUsers]);
      }),
      catchError(error => {
        console.error('Error creando usuario:', error);
        this.error.set('No se pudo crear el usuario');
        throw error;
      })
    );
  }

  // Métodos para Features
  loadFeatures(): Observable<Feature[]> {
    return this.http.get<Feature[]>(`${this.API_BASE_URL}/features`).pipe(
      tap(features => {
        this.features.set(features);
      }),
      catchError(error => {
        console.error('Error cargando features:', error);
        const mockFeatures = this.getMockFeatures();
        this.features.set(mockFeatures);
        return of(mockFeatures);
      })
    );
  }

  // Métodos para Stats
  loadStats(): Observable<Stat[]> {
    return this.http.get<Stat[]>(`${this.API_BASE_URL}/stats`).pipe(
      tap(stats => {
        this.stats.set(stats);
      }),
      catchError(error => {
        console.error('Error cargando estadísticas:', error);
        const mockStats = this.getMockStats();
        this.stats.set(mockStats);
        return of(mockStats);
      })
    );
  }

  // Health check
  checkHealth(): Observable<any> {
    return this.http.get(`${this.API_BASE_URL}/health`).pipe(
      catchError(error => {
        console.error('Error en health check:', error);
        return of({
          status: 'unhealthy',
          message: 'API no disponible',
          database: 'disconnected'
        });
      })
    );
  }

  // Getters para los signals
  getUsers() {
    return this.users.asReadonly();
  }

  getFeatures() {
    return this.features.asReadonly();
  }

  getStats() {
    return this.stats.asReadonly();
  }

  isLoading() {
    return this.loading.asReadonly();
  }

  getError() {
    return this.error.asReadonly();
  }

  // Métodos Mock para fallback
  getMockUsers(): User[] {
    return [
      { id: 1, name: 'Ana García', email: 'ana@ejemplo.com', role: 'admin', created_at: '2024-01-15T10:30:00Z', is_active: true },
      { id: 2, name: 'Carlos Rodríguez', email: 'carlos@ejemplo.com', role: 'developer', created_at: '2024-01-16T14:20:00Z', is_active: true },
      { id: 3, name: 'María López', email: 'maria@ejemplo.com', role: 'user', created_at: '2024-01-17T09:15:00Z', is_active: true },
      { id: 4, name: 'Juan Martínez', email: 'juan@ejemplo.com', role: 'developer', created_at: '2024-01-18T16:45:00Z', is_active: true }
    ];
  }

  getMockFeatures(): Feature[] {
    return [
      { id: 1, title: 'Rendimiento Ultra Rápido', description: 'CDN global y compresión automática para máxima velocidad', icon: 'zap', category: 'performance' },
      { id: 2, title: 'SSL Gratuito', description: 'Certificados SSL automáticos y renovación sin esfuerzo', icon: 'shield', category: 'security' },
      { id: 3, title: 'Escalabilidad Infinita', description: 'Soporte para millones de usuarios sin configuración adicional', icon: 'trending-up', category: 'infrastructure' }
    ];
  }

  getMockStats(): Stat[] {
    return [
      { metric_name: 'uptime', metric_value: '99.9', metric_label: 'Uptime', category: 'performance' },
      { metric_name: 'load_time', metric_value: '< 1s', metric_label: 'Load Time', category: 'performance' },
      { metric_name: 'ssl_cert', metric_value: 'Free', metric_label: 'SSL Certificate', category: 'security' }
    ];
  }
}
