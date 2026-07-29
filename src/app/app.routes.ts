import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Wishlist | keep the things you want',
    loadComponent: () => import('./features/home/home-page').then(({ HomePage }) => HomePage),
  },
  {
    path: 'details',
    title: 'Build notes | Wishlist',
    loadComponent: () =>
      import('./features/details/details-page').then(({ DetailsPage }) => DetailsPage),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
