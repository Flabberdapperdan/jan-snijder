import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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

  groupPaintingsByThree(): PaintingUrl[][] {
    const grouped: PaintingUrl[][] = [];
    for (let i = 0; i < this.paintings.length; i += 3) {
      grouped.push(this.paintings.slice(i, i + 3));
    }
    return grouped;
  }
}
