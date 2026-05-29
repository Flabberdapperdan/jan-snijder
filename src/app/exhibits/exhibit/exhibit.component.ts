import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-exhibit',
  standalone: true,
  imports: [],
  templateUrl: './exhibit.component.html',
  styleUrl: './exhibit.component.css',
})
export class ExhibitComponent implements OnDestroy {
  private hoverLeaveTimeout: ReturnType<typeof setTimeout> | null = null;

  @Input() name: string = '';
  @Input() year: number = 0;
  @Input() location: string = '';
  @Input() description: string = '';

  @Input() index: number | null = null;
  @Input() showInformation: boolean = false;
  @Output() panelClicked = new EventEmitter<number | null>();

  hoverInformation: boolean = false;

  onClick(): void {
    this.showInformation
      ? this.panelClicked.emit(null)
      : this.panelClicked.emit(this.index);
  }

  onHover(): void {
    this.clearHoverLeaveTimeout();
    this.hoverInformation = true;
  }

  onLeave(): void {
    this.clearHoverLeaveTimeout();
    this.hoverLeaveTimeout = setTimeout(() => {
      this.hoverInformation = false;
      this.hoverLeaveTimeout = null;
    }, 120);
  }

  ngOnDestroy(): void {
    this.clearHoverLeaveTimeout();
  }

  private clearHoverLeaveTimeout(): void {
    if (this.hoverLeaveTimeout) {
      clearTimeout(this.hoverLeaveTimeout);
      this.hoverLeaveTimeout = null;
    }
  }

  onDestroy(): void {
    this.clearHoverLeaveTimeout();
  }
}
