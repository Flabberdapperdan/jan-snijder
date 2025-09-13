import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SanityService } from './service/sanity.service';
import { Painting, PaintingUrl } from './carousel.types';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  providers: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent implements OnInit {
  @Input() autoPlay: boolean = false;
  @Input() interval: number = 5000;
  paintings: PaintingUrl[] = [];

  currentIndex: number = 0;
  translateX: number = 0;
  private autoPlayInterval: any;

  constructor(private service: SanityService) {}

  ngOnInit(): void {
    this.getPaintings();
    if (this.autoPlay) {
      this.startAutoPlay();
    }
  }

  getPaintings(): void {
    this.service.getPaintings().then((data) => {
      data.map((item: Painting) => {
        this.paintings.push({
          url: this.service.urlFor(item.image).url(),
          title: item.title,
        });
      });
    });
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  prevSlide(): void {
    if (this.currentIndex > 0) {
      this.goToSlide(this.currentIndex - 1);
    }
  }

  nextSlide(): void {
    if (this.currentIndex < this.paintings.length - 1) {
      this.goToSlide(this.currentIndex + 1);
    } else if (this.autoPlay) {
      // Loop back to first slide when autoplay reaches the end
      this.goToSlide(0);
    }
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
    const containerWidth =
      document.querySelector('.carousel-container')?.clientWidth || 0;
    this.translateX = -index * containerWidth;
    console.log(this.translateX);

    // Reset the autoplay timer when manually navigating
    if (this.autoPlay) {
      this.restartAutoPlay();
    }
  }

  private startAutoPlay(): void {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, this.interval);
  }

  private stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  private restartAutoPlay(): void {
    this.stopAutoPlay();
    this.startAutoPlay();
  }
}
