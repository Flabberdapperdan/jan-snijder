import { Component, Input } from '@angular/core';
import { Video } from './video.types';
import { SkeletonLoaderComponent } from '../shared/skeleton-loader/skeleton-loader.component';

@Component({
  imports: [SkeletonLoaderComponent],
  selector: 'app-video',
  styleUrl: './video.component.css',
  templateUrl: './video.component.html',
})
export class VideoComponent {
  @Input() video: Video | null = null;
  @Input() isLoading = true;
  @Input() hasError = false;
}
