import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SanityService } from './service/carousel.service';
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

  constructor(private service: SanityService) { }

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
}
