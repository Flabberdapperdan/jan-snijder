import { Component, OnDestroy, OnInit } from '@angular/core';
import { NewsService } from './service/news.service';
import { NewsItem } from './news.types';

@Component({
  selector: 'app-news',
  imports: [],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
})
export class NewsComponent implements OnInit, OnDestroy {
  newsItems: NewsItem[] = [];
  activeIndex: number | null = 0;
  private activeItemInterval: ReturnType<typeof setInterval> | null = null;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.getNewsItems();
  }

  ngOnDestroy(): void {
    this.stopActiveCycle();
  }

  getNewsItems(): void {
    this.newsItems = [];
    this.newsService.getNewsItems().then((items) => {
      this.newsItems = items;
      this.activeIndex = items.length > 0 ? 0 : null;
      this.startActiveCycle();
    });
  }

  userToggleActive(index: number): void {
    this.toggleActive(index);
    this.stopActiveCycle();
  }

  // Keep the selected item open and restart the cycle from that item.
  toggleActive(index: number): void {
    this.activeIndex = index ?? 0;
    this.startActiveCycle();
  }

  startActiveCycle(): void {
    this.stopActiveCycle();

    if (this.newsItems.length <= 1) {
      return;
    }

    this.activeItemInterval = setInterval(() => {
      this.cycleActiveItem();
    }, 3000);
  }

  cycleActiveItem(): void {
    if (this.newsItems.length === 0) {
      this.activeIndex = null;
      return;
    }

    const currentIndex = this.activeIndex ?? -1;
    this.activeIndex = (currentIndex + 1) % this.newsItems.length;
  }

  stopActiveCycle(): void {
    if (this.activeItemInterval) {
      clearInterval(this.activeItemInterval);
      this.activeItemInterval = null;
    }
  }
}
