import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CarouselService } from './service/carousel.service';
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
  @ViewChild('carouselContainer') carouselContainer!: ElementRef;

  paintings: PaintingUrl[] = [];
  selectedPainting: PaintingUrl | null = null;
  showSelectedPainting: boolean = false;

  constructor(private service: CarouselService) {}

  ngOnInit(): void {
    this.getPaintings();
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

  onClickPainting(index: number): void {
    this.selectedPainting = this.paintings[index];
    this.showSelectedPainting = true;
  }

  onClickClose(): void {
    this.showSelectedPainting = false;
  }

  onClickPrevious(): void {
    console.log('clicking previous');
    this.carouselContainer.nativeElement.scrollBy({
      left: -300,
      behavior: 'smooth',
    });
  }
  
  onClickNext(): void {
    console.log('clicking next');
    this.carouselContainer.nativeElement.scrollBy({
      left: 300,
      behavior: 'smooth',
    });
  }


  groupPaintingsByThree(): PaintingUrl[][] {
    const grouped: PaintingUrl[][] = [];
    for (let i = 0; i < this.paintings.length; i += 3) {
      grouped.push(this.paintings.slice(i, i + 3));
    }
    return grouped;
  }
}
