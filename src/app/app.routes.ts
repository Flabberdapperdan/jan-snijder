import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ExhibitsComponent } from './exhibits/exhibits.component';
import { CarouselComponent } from './carousel/carousel.component';
import { SanityClient } from '@sanity/client';

export const routes: Routes = [
  { path: '', title: 'Home', component: HomeComponent },
  { path: 'exposities', title: 'Exposities', component: ExhibitsComponent },
  { path: 'contact', title: 'Contact', component: ContactComponent },
  { path: 'werken', title: 'Werken', component: CarouselComponent },
];
