import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent implements OnInit {
  images: Array<Image> = [];
  activeImageIndex: number = 0

  ngOnInit(): void {
    this.images = [
      {
        index: 0,
        src: 'https://cdn.nos.nl/image/2024/03/29/1067142/1024x576a.jpg',
      },
      {
        index: 1,
        src: 'https://cdn.nos.nl/image/2024/03/29/1067142/1024x576a.jpg',
      },
      {
        index: 2,
        src: 'https://cdn.nos.nl/image/2024/03/29/1067142/1024x576a.jpg',
      },
    ];
  }
}

interface Image {
  index: number;
  src: string;
}
