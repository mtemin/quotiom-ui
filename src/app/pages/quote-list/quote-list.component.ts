import {Component, ViewEncapsulation} from '@angular/core';
import { FilteringBarComponent } from '../../components/filtering-bar/filtering-bar';
import {CategoriesSidebarComponent} from "../../components/categories-sidebar/categories-sidebar.component";
import {NavbarComponent} from "../../components/navbar/navbar.component";
import {QuoteComponent} from "../../components/quote/quote.component";
import {quotes} from "../../mockDB/quotes";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quote-list',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FilteringBarComponent,
    CategoriesSidebarComponent,
    QuoteComponent,
  ],
  templateUrl: './quote-list.component.html',
  styleUrl: './quote-list.component.scss',
  encapsulation: ViewEncapsulation.None

})
export class QuoteListComponent {

  protected readonly quotes = quotes;

  sortBy(param: string){
    if(param=='mostLiked'){
      quotes.sort((a, b) =>
        (a.likes > b.likes ? -1 : 1)
      );
    }
    // if(param=='recentlyAdded'){
    //   quotes.sort((a, b) =>
    //     (a.likes > b.likes ? -1 : 1)
    //   );
    // }
  }
}
