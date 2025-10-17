import { Injectable } from '@angular/core';
import { client } from '../../../../sanity/client';
import { Painting } from '../carousel.types';
import imageUrlBuilder from '@sanity/image-url';

@Injectable({
  providedIn: 'root',
})
export class SanityService {
  constructor() {}

  private Paintings_Query = `
    *[_type == "painting"]{
      _id,
      image,
      title,
      }
    `;
  async getPaintings(): Promise<Painting[]> {
    return await client.fetch<Painting[]>(this.Paintings_Query, {}, {}); // Do we need options here?
  }

  urlFor = (source: any) => imageUrlBuilder(client).image(source);
}
