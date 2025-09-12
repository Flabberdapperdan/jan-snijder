// src/app/service/sanity.service.ts

import { Injectable } from '@angular/core';
import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

@Injectable({
  providedIn: 'root',
})
export class SanityService {

  sanityClientCredentials = {
    option: sanityClient({
      projectId: 'etofyibz',
      dataset: 'production',
    }),
  };

  urlFor = (source: any) =>
    imageUrlBuilder(this.sanityClientCredentials.option).image(source);

  async getPaintings(): Promise<Painting[]> {
    return await this.sanityClientCredentials.option.fetch(
      `*[_type == "movie"]{
        _id,
        image,
        title,
      }`
    );
  }
}

// Types
interface Painting {
  _id: string;
  image: string;
  title: string;
}
