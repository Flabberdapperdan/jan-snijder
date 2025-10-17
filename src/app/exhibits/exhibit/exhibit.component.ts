import { Component, Input } from '@angular/core';

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

  constructor() {}
}
