import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { client } from '../../../../sanity/client';
import { VideoService } from './video.service';

describe('VideoService', () => {
  let service: VideoService;

  beforeEach(() => {
    service = new VideoService();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches the singleton video document', async () => {
    const video = {
      _id: 'video',
      title: 'Studio video',
      description: 'A short film',
      videoUrl: 'https://example.com/video.mp4',
    };
    const fetchSpy = vi
      .spyOn(client, 'fetch')
      .mockResolvedValue(video as never);

    await expect(service.getVideo()).resolves.toEqual(video);
    expect(fetchSpy.mock.calls[0][0]).toContain('*[_type == "video"][0]');
    expect(fetchSpy.mock.calls[0][0]).toContain('videoUrl');
  });

  it('returns null when no video document is published', async () => {
    vi.spyOn(client, 'fetch').mockResolvedValue(null as never);

    await expect(service.getVideo()).resolves.toBeNull();
  });
});
