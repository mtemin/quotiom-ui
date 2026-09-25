import { Component, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-filtering-bar',
  styleUrl: './filtering-bar.scss',
  templateUrl: './filtering-bar.html',
})
export class FilteringBarComponent {
  //  deleteBook = output('sortByMostLiked')
  //  deleteBook = output('sortByRecentlyAdded')

  sortBy(parameter: string) {

  }
}
