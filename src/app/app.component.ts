import { Component, ChangeDetectionStrategy } from '@angular/core';

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
export class AppComponent {
  title = 'jan-snijder';
}
