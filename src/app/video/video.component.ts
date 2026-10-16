import { Component, Input } from '@angular/core';
import { Video } from './video.types';

@Component({
  imports: [],
  selector: 'app-video',
  styleUrl: './video.component.css',
  templateUrl: './video.component.html',
})
export class VideoComponent {
  @Input() video: Video | null = null;
  @Input() isLoading = true;
  @Input() hasError = false;
}
