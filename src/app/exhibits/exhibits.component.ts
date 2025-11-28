import { Component, OnInit } from '@angular/core';
import { ExhibitComponent } from './exhibit/exhibit.component';
import { ExhibitsService } from './service/exhibits.service';
import { Exhibit } from './exhibits.types';

@Component({
  selector: 'app-exhibits',
  standalone: true,
  imports: [ExhibitComponent],
  templateUrl: './exhibits.component.html',
  styleUrl: './exhibits.component.css',
})
export class ExhibitsComponent implements OnInit {
  exhibits: Exhibit[] = [];
  currentIndex: number | null = null;

  constructor(private service: ExhibitsService) {}

  ngOnInit(): void {
    this.service.getExhibits().then((data) => {
      this.exhibits = data;
    });
  }

  changeCurrentIndex(index: number): void {
    this.currentIndex = index;
  }
}
