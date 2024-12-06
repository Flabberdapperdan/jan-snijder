import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ExhibitsComponent } from './exhibits/exhibits.component';

export const routes: Routes = [
  { path: '', title: 'Home', component: HomeComponent },
  { path: 'exposities', title: 'Exposities', component: ExhibitsComponent },
  { path: 'contact', title: 'Contact', component: ContactComponent },
];
