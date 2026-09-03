import {Component, Inject, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {QuoteComponent} from "../../../components/quote/quote.component";
import {quotes} from "../../../mockDB/quotes";
import {NgForOf} from "@angular/common";
import {NavbarComponent} from "../../../components/navbar/navbar.component";

@Component({
  selector: 'app-quote-detail',
  standalone: true,
  imports: [
    // QuoteComponent,
    // NgForOf,
    NavbarComponent
  ],
  templateUrl: './quote-detail.component.html',
  styleUrl: './quote-detail.component.scss'
})
export class QuoteDetailComponent {
  // @Input({required:true}) quoteId!: string;
  // id: string|null;

  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {


    let id = this.route.snapshot.paramMap.get('id');

  }

  protected readonly quotes = quotes;
}
