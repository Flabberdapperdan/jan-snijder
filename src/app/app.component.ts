import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { PageContentService } from './content/page-content.service';
import { PageContent } from './content/page-content.types';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ExhibitsComponent } from './exhibits/exhibits.component';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { VideoComponent } from './video/video.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    CarouselComponent,
    ExhibitsComponent,
    HomeComponent,
    NewsComponent,
    VideoComponent,
  ],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'jan-snijder';
  pageContent: PageContent = {
    home: null,
    newsItems: [],
    exhibits: [],
    video: null,
  };
  isLoading = true;
  hasContentError = false;

  constructor(private pageContentService: PageContentService) {}

  ngOnInit(): void {
    this.pageContentService
      .getPageContent()
      .then((content) => {
        this.pageContent = content;
      })
      .catch((error) => {
        this.hasContentError = true;
        console.error('Error fetching page content:', error);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}
