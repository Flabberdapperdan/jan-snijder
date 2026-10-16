import { Component, Input } from '@angular/core';

export type SkeletonVariant =
  | 'hero'
  | 'news'
  | 'carousel'
  | 'video'
  | 'exhibits';

@Component({
  selector: 'app-skeleton-loader',
  standalone: true,
  templateUrl: './skeleton-loader.component.html',
  styleUrl: './skeleton-loader.component.css',
})
export class SkeletonLoaderComponent {
  @Input() variant: SkeletonVariant = 'news';

  readonly placeholders = [0, 1, 2, 3];
}
