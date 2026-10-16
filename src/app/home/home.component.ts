import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Home } from './home.types';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './home.component.css',
})
export class HomeComponent {
  @Input() home: Home | null = null;
  @Input() loading = true;
}
