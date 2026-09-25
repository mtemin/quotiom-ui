import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {CategoriesComponent} from "./pages/categories/categories.component";
import {QuoteListComponent} from "./pages/quote-list/quote-list.component";
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";
import {QuoteDetailComponent} from "./pages/quote-list/quote-detail/quote-detail.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Quotiom | Home Page'
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    title: 'Quote Categories'
  },
  {
    path: 'quotes',
    component: QuoteListComponent,
    title: 'Quotes'
  },
  {
    path: 'quotes/:id',
    component: QuoteDetailComponent,
    title: 'Quotes'
  },
  { path: '**',
    component: PageNotFoundComponent,
    title:'Page not found'
  },
];
