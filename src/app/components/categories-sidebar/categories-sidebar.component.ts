import {Component, ViewEncapsulation} from '@angular/core';
import {AccordionModule} from "@openng/optimus-ui/accordion";
import categories from "../../mockDB/categories";
import famousPeople from "../../mockDB/famousPeople";
import movies from "../../mockDB/movies";
import books from "../../mockDB/books";
import {Category} from "../../models/Category";
import {Movie} from "../../models/Movie";
import {FamousPeople} from "../../models/FamousPeople";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-categories-sidebar',
  standalone: true,
  imports: [
    AccordionModule,
    NgForOf,
  ],
  templateUrl: './categories-sidebar.component.html',
  styleUrl: './categories-sidebar.component.scss',
  encapsulation: ViewEncapsulation.None
  // schemas: [NO_ERRORS_SCHEMA]

})
export class CategoriesSidebarComponent {

  protected readonly categories:Category[] = categories;
  protected readonly famousPeople:FamousPeople[] = famousPeople;
  protected readonly movies:Movie[] = movies;
   ngOnInit(){
     console.log(famousPeople)
   }

  protected readonly books = books;
}
