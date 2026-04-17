import { Component, OnInit } from '@angular/core';
import { NewsService } from './service/news.service';
import { NewsItem } from './news.types';

@Component({
  selector: 'app-news',
  imports: [],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
})
export class NewsComponent implements OnInit {
  newsItems: NewsItem[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.getNewsItems();
  }

  getNewsItems(): void {
    this.newsItems = [];
    this.newsService.getNewsItems().then((items) => {
      this.newsItems = items;
    });
  }
}
