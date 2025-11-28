import { Component, Input, output } from '@angular/core';

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
  panelClicked = output<any>();

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
