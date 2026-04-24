import { Injectable } from '@angular/core';
import { client } from '../../../../sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { NewsItem } from '../news.types';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private NewsItems_Query = `
    *[_type == "newsItem"]{
      _id,
      title,
      text,
      image,
      link,
      linkText
    }
  `;

  async getNewsItems(): Promise<NewsItem[]> {
    const rawItems = await client.fetch<
      {
        _id: string;
        title: string;
        text: string;
        image: any;
        link: string;
        linkText: string;
      }[]
    >(this.NewsItems_Query, {}, {});

    return rawItems.map((item) => ({
      id: item._id,
      title: item.title,
      text: item.text,
      image: item.image ? this.urlFor(item.image).url() : '',
      link: item.link,
      linkText: item.linkText,
    }));
  }

  urlFor = (source: any) => imageUrlBuilder(client).image(source);
}
