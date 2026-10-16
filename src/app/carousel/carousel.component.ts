import {
  Component,
  Input,
  OnChanges,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { PaintingUrl } from './carousel.types';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  providers: [],
  templateUrl: './carousel.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './carousel.component.css',
})
export class CarouselComponent implements OnChanges {
  @Input() autoPlay: boolean = false;
  @Input() interval: number = 5000;
  @Input() paintings: PaintingUrl[] = [];
  @Input() isLoading = true;
  @Input() hasError = false;
  @ViewChild('carouselContainer') carouselContainer!: ElementRef;

  groupedPaintings: PaintingUrl[][] = [];
  selectedPainting: PaintingUrl | null = null;
  showSelectedPainting: boolean = false;
  timelines: string = '';
  maxIndex: number = 0;

  ngOnChanges(): void {
    this.groupPaintingsByThree();
  }

  onClickPainting(painting: PaintingUrl): void {
    this.selectedPainting = painting;
    this.showSelectedPainting = true;
  }

  onClickClose(): void {
    this.showSelectedPainting = false;
  }

  onClickPrevious(): void {
    console.log('clicking previous');
    this.carouselContainer.nativeElement.scrollBy({
      left: -600,
      behavior: 'smooth',
    });
  }

  onClickNext(): void {
    console.log('clicking next');
    this.carouselContainer.nativeElement.scrollBy({
      left: 600,
      behavior: 'smooth',
    });
  }

  groupPaintingsByThree(): void {
    this.groupedPaintings = [];
    this.timelines = '';
    this.maxIndex = 0;
    for (let i = 0; i < this.paintings.length; i += 3) {
      if (i !== 0) {
        this.timelines += `, `;
      }
      this.groupedPaintings.push(this.paintings.slice(i, i + 3));
      this.timelines += `--section-${this.groupedPaintings.length}`;
      this.maxIndex = this.groupedPaintings.length;
    }
  }
}
