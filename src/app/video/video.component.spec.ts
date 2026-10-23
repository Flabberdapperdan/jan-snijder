import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { VideoComponent } from './video.component';

describe('VideoComponent', () => {
  let component: VideoComponent;
  let fixture: ComponentFixture<VideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trust a complete Vimeo player URL with valid parameters', () => {
    fixture.componentRef.setInput('video', {
      _id: 'video-1',
      videoUrl:
        'https://player.vimeo.com/video/1238778934?h=82ab485271&autoplay=1',
    });

    fixture.detectChanges();

    expect(component.sanitizedVideoUrl).not.toBeNull();
  });

  it('should reject Vimeo URLs with credentials, alternate ports, or unknown parameters', () => {
    const invalidUrls = [
      'https://user:pass@player.vimeo.com/video/1238778934',
      'https://player.vimeo.com:8443/video/1238778934',
      'https://player.vimeo.com/video/1238778934?redirect=https://example.com',
    ];

    for (const videoUrl of invalidUrls) {
      fixture.componentRef.setInput('video', { _id: 'video-1', videoUrl });
      fixture.detectChanges();

      expect(component.sanitizedVideoUrl).toBeNull();
    }
  });
});
