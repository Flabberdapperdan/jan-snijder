import { Injectable } from '@angular/core';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '../../../sanity/client';
import { PageContent } from './page-content.types';
import { Exhibit } from '../exhibits/exhibits.types';
import { Home } from '../home/home.types';
import { NewsItem } from '../news/news.types';
import { Video } from '../video/video.types';

interface RawPageContent {
  home: (Omit<Home, 'image'> & { image: unknown }) | null;
  newsItems: {
    _id: string;
    title: string;
    text: string;
    image: unknown;
    link: string;
    linkText: string;
  }[];
  exhibits: Exhibit[];
  video: Video | null;
}

@Injectable({
  providedIn: 'root',
})
export class PageContentService {
  private pageContentRequest?: Promise<PageContent>;

  private readonly PAGE_CONTENT_QUERY = `
    {
      "home": *[_type == "home"][0]{
        _id,
        title,
        subtitle,
        image
      },
      "newsItems": *[_type == "newsItem"]{
        _id,
        title,
        text,
        image,
        link,
        linkText
      },
      "exhibits": *[_type == "exhibit"] | order(year desc){
        _id,
        name,
        year,
        location,
        description
      },
      "video": *[_type == "video"][0]{
        _id,
        title,
        description,
        videoUrl
      }
    }
  `;

  getPageContent(): Promise<PageContent> {
    if (!this.pageContentRequest) {
      this.pageContentRequest = client
        .fetch<RawPageContent>(this.PAGE_CONTENT_QUERY, {}, {})
        .then((content) => this.normalizeContent(content))
        .catch((error: unknown) => {
          this.pageContentRequest = undefined;
          throw error;
        });
    }

    return this.pageContentRequest;
  }

  private normalizeContent(content: RawPageContent): PageContent {
    const imageBuilder = imageUrlBuilder(client);
    const home = content.home
      ? {
          ...content.home,
          image: content.home.image
            ? imageBuilder.image(content.home.image as never).url()
            : '',
        }
      : null;

    return {
      home,
      newsItems: content.newsItems.map((item) => ({
        id: item._id,
        title: item.title,
        text: item.text,
        image: item.image ? imageBuilder.image(item.image as never).url() : '',
        link: item.link,
        linkText: item.linkText,
      })),
      exhibits: content.exhibits,
      video: content.video,
    };
  }
}
