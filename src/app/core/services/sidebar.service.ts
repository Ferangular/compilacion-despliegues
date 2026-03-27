import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private isCollapsedSignal = signal(false);
  
  // Exponer el signal como readonly para que otros componentes puedan leerlo
  readonly isCollapsed = this.isCollapsedSignal.asReadonly();
  
  toggle(): void {
    this.isCollapsedSignal.update(collapsed => !collapsed);
  }
  
  setCollapsed(collapsed: boolean): void {
    this.isCollapsedSignal.set(collapsed);
  }
}
