import { Exhibit } from '../exhibits/exhibits.types';
import { Home } from '../home/home.types';
import { NewsItem } from '../news/news.types';
import { Video } from '../video/video.types';

export interface PageContent {
  home: Home | null;
  newsItems: NewsItem[];
  exhibits: Exhibit[];
  video: Video | null;
}
