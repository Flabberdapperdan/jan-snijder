import { Component, OnInit } from '@angular/core';
import { HomeService } from './services/home.service';
import { CarouselService } from '../carousel/service/carousel.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  title: string = '';
  subtitle: string = '';
  coverImageUrl: string = '';

  constructor(
    private homeService: HomeService,
    private carouselService: CarouselService
  ) {}

  ngOnInit(): void {
    this.getContent();
  }

  getContent(): void {
    this.homeService
      .getContent()
      .then((data) => {
        this.title = data[0].title;
        this.subtitle = data[0].subtitle;
        this.coverImageUrl = this.carouselService.urlFor(data[0].image).url();
      })
      .catch((error) => {
        console.error('Error fetching home content:', error);
      });
  }
}
