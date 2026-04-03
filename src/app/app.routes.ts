import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ExhibitsComponent } from './exhibits/exhibits.component';
import { CarouselComponent } from './carousel/carousel.component';

export const routes: Routes = [
  { path: '', title: 'Home', component: HomeComponent }
];
