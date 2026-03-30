import { Component, Input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { Feature } from '../home.component';

@Component({
  selector: 'app-home-features-section',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './home-features-section.component.html',
  styleUrl: './home-features-section.component.scss'
})
export class HomeFeaturesSectionComponent {
  @Input({ required: true }) features!: Feature[];
  
  navigateTo(path: string): void {
    window.location.href = path;
  }
}
