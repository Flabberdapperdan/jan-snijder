import { Component } from '@angular/core'
import { ExhibitComponent } from './exhibit/exhibit.component'

@Component({
  selector: 'app-exhibits',
  standalone: true,
  imports: [ExhibitComponent],
  templateUrl: './exhibits.component.html',
  styleUrl: './exhibits.component.css',
})
export class ExhibitsComponent {}
