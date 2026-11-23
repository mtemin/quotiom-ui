import { Component, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-filtering-bar',
  styleUrl: './filtering-bar.scss',
  templateUrl: './filtering-bar.html',
})
export class FilteringBarComponent {
  sortByMostLiked = output<void>()
  sortByRecentlyAdded = output<void>()
  search = output<string>()

  onSort(parameter: string) {
    if(parameter == 'mostLiked'){
      this.sortByMostLiked.emit()
    }

    if(parameter == 'recentlyAdded') {
      this.sortByRecentlyAdded.emit()
    }

  }
}
