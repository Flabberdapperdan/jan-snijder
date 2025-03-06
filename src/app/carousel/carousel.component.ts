import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent implements OnInit {
  @Input() images: string[] = [];
  @Input() autoPlay: boolean = false;
  @Input() interval: number = 5000;

  currentIndex: number = 0;
  translateX: number = 0;
  private autoPlayInterval: any;

  ngOnInit(): void {
    this.images = [
      'https://cdn.nos.nl/image/2024/03/29/1067142/1024x576a.jpg',
      'https://cdn.nos.nl/image/2024/03/29/1067142/1024x576a.jpg',
      'https://cdn.nos.nl/image/2024/03/29/1067142/1024x576a.jpg',
    ];

    if (this.autoPlay) {
      this.startAutoPlay();
    }
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
    if (this.currentIndex < this.images.length - 1) {
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
