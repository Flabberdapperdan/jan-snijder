import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ExhibitsComponent } from './exhibits/exhibits.component';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    CarouselComponent,
    ExhibitsComponent,
    HomeComponent,
    NewsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'jan-snijder';
}
