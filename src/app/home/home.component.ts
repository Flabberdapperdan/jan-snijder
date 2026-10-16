import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Home } from './home.types';
import { SkeletonLoaderComponent } from '../shared/skeleton-loader/skeleton-loader.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SkeletonLoaderComponent],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './home.component.css',
})
export class HomeComponent {
  @Input() home: Home | null = null;
  @Input() loading = true;
}
