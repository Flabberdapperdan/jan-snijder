import { Component, OnInit } from '@angular/core';
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  title: string = '';
  subtitle: string = '';

  constructor(private service: HomeService) { }

  ngOnInit(): void {
    this.getContent();
  }

  getContent(): void {
    this.service.getContent().then((data) => {
      this.title = data[0].title;
      this.subtitle = data[0].subtitle;
    }).catch((error) => {
      console.error('Error fetching home content:', error);
    });
  }
}
