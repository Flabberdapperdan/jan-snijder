import { Injectable } from '@angular/core';
import { client } from '../../../../sanity/client';
import { Video } from '../video.types';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private readonly VIDEO_QUERY = `
    *[_type == "video"][0]{
      _id,
      title,
      description,
      videoUrl
    }
  `;

  async getVideo(): Promise<Video | null> {
    return await client.fetch<Video | null>(this.VIDEO_QUERY, {}, {});
  }
}
