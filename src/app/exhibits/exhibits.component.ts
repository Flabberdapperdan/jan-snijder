import {
  Component,
  Input,
  OnChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ExhibitComponent } from './exhibit/exhibit.component';
import { Exhibit } from './exhibits.types';

@Component({
  selector: 'app-exhibits',
  standalone: true,
  imports: [ExhibitComponent],
  templateUrl: './exhibits.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './exhibits.component.css',
})
export class ExhibitsComponent implements OnChanges {
  private readonly initialVisibleCount = 15;

  @Input() exhibits: Exhibit[] = [];
  @Input() isLoading = true;
  visibleExhibits: Exhibit[] = [];
  extraExhibits: Exhibit[] = [];
  canExpandExhibits = false;
  currentIndex: number | null = null;
  showAllExhibits = false;

  ngOnChanges(): void {
    this.syncExhibitsLists();
  }

  changeCurrentIndex(index: number | null): void {
    if (index !== null) {
      this.currentIndex = index;
    }
  }

  toggleExhibitsExpansion(): void {
    this.showAllExhibits = !this.showAllExhibits;

    if (!this.showAllExhibits && this.currentIndex !== null) {
      if (this.currentIndex >= this.initialVisibleCount) {
        this.currentIndex = null;
      }
    }
  }

  private syncExhibitsLists(): void {
    this.canExpandExhibits = this.exhibits.length > this.initialVisibleCount;
    this.visibleExhibits = this.exhibits.slice(0, this.initialVisibleCount);
    this.extraExhibits = this.exhibits.slice(this.initialVisibleCount);
  }
}
