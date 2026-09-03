import {Component, ViewEncapsulation} from '@angular/core';
import {NavbarComponent} from "../../components/navbar/navbar.component";
import {CategoryCardComponent} from "../../components/category-card/category-card.component";
import {NgForOf} from "@angular/common";
import {QuoteComponent} from "../../components/quote/quote.component";
import {CategoriesSidebarComponent} from "../../components/categories-sidebar/categories-sidebar.component";
import {quotes} from "../../mockDB/quotes";

@Component({
  selector: 'app-quote-list',
  standalone: true,
  imports: [
    NavbarComponent,
    // CategoryCardComponent,

    NgForOf,
    QuoteComponent,
    CategoriesSidebarComponent
  ],
  templateUrl: './quote-list.component.html',
  styleUrl: './quote-list.component.scss',
  encapsulation: ViewEncapsulation.None

})
export class QuoteListComponent {

  protected readonly quotes = quotes;
}
