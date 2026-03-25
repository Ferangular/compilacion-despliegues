import { Component, signal } from '@angular/core';
import { CheckVersion } from './components/check-version/check-version';

@Component({
  selector: 'app-root',
  imports: [CheckVersion],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Compilación & Despliegues');

}
