import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CarouselService {
  private clientId = '7463f44f46f86c7';

  constructor(private http: HttpClient) {}

  getImagesObjects(): any {
    const albumHash = 'KqRtjOF';
    const url = `https://api.imgur.com/3/album/${albumHash}/images`;
    const options = {
      headers: {
        Authorization: `Client-ID ${this.clientId}`,
      },
    };
    return this.http.get<any>(url, options)
  }
}

// TYPES
export type ImgurAlbumReturn = {
  data: ImageObj[];
};
export type ImageObj = {
  link: string;
};
