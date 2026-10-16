import { Component, OnInit, inject } from '@angular/core';
import { VideoService } from './service/video.service';
import { Video } from './video.types';

@Component({
  imports: [],
  selector: 'app-video',
  styleUrl: './video.component.css',
  templateUrl: './video.component.html',
})
export class VideoComponent implements OnInit {
  private readonly videoService = inject(VideoService);

  video: Video | null = null;
  isLoading = true;
  hasError = false;

  async ngOnInit(): Promise<void> {
    try {
      this.video = await this.videoService.getVideo();
    } catch {
      this.hasError = true;
    } finally {
      this.isLoading = false;
    }
  }
}
