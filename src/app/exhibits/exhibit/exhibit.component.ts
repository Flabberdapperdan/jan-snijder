import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-exhibit', 
  standalone: true,
  imports: [],
  templateUrl: './exhibit.component.html',
  styleUrl: './exhibit.component.css',
})
export class ExhibitComponent {
  @Input() name: string = '';
  @Input() year: number = 0;
  @Input() location: string = '';
  @Input() description: string = '';

  @Input() index: number | null = null;
  @Input() showInformation: boolean = false;
  @Output() panelClicked = new EventEmitter<number | null>();

  hoverInformation: boolean = false;

  onClick(): void {
    this.showInformation ? this.panelClicked.emit(null) : this.panelClicked.emit(this.index) ;
  }

  onHover(): void {
    this.hoverInformation = true;
  }

  onLeave(): void {
    this.hoverInformation = false;
  }
}
