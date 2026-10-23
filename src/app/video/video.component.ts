import { Component, Input, OnChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Video } from './video.types';

@Component({
  imports: [],
  selector: 'app-video',
  styleUrl: './video.component.css',
  templateUrl: './video.component.html',
})
export class VideoComponent implements OnChanges {
  private readonly allowedVideoParameters = new Set([
    'app_id',
    'autopause',
    'autoplay',
    'background',
    'byline',
    'color',
    'controls',
    'dnt',
    'h',
    'keyboard',
    'loop',
    'muted',
    'pip',
    'playsinline',
    'portrait',
    'quality',
    'speed',
    'texttrack',
    'title',
    'transparent',
  ]);

  @Input() video: Video | null = null;
  @Input() isLoading = true;
  @Input() hasError = false;

  sanitizedVideoUrl: SafeResourceUrl | null = null;

  constructor(private readonly sanitizer: DomSanitizer) {}

  ngOnChanges(): void {
    this.sanitizedVideoUrl = this.getTrustedVideoUrl(this.video?.videoUrl);
  }

  private getTrustedVideoUrl(videoUrl?: string): SafeResourceUrl | null {
    if (!videoUrl || videoUrl.length > 2048) {
      return null;
    }

    try {
      const url = new URL(videoUrl);
      if (
        url.origin !== 'https://player.vimeo.com' ||
        url.username !== '' ||
        url.password !== '' ||
        url.hash !== '' ||
        !/^\/video\/\d+$/.test(url.pathname) ||
        !this.hasValidVideoParameters(url.searchParams)
      ) {
        return null;
      }

      return this.sanitizer.bypassSecurityTrustResourceUrl(url.href);
    } catch {
      return null;
    }
  }

  private hasValidVideoParameters(searchParams: URLSearchParams): boolean {
    const seenParameters = new Set<string>();

    for (const [name, value] of searchParams) {
      if (
        !this.allowedVideoParameters.has(name) ||
        seenParameters.has(name) ||
        value.length === 0 ||
        value.length > 100
      ) {
        return false;
      }

      if (name === 'h' && !/^[A-Za-z0-9_-]{1,64}$/.test(value)) {
        return false;
      }

      if (name === 'app_id' && !/^\d{1,20}$/.test(value)) {
        return false;
      }

      if (name === 'color' && !/^#?[A-Fa-f0-9]{6}$/.test(value)) {
        return false;
      }

      seenParameters.add(name);
    }

    return true;
  }
}
