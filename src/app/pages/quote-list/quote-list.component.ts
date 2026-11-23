import { Component, ViewEncapsulation, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of, startWith } from 'rxjs';
import { FilteringBarComponent } from '../../components/filtering-bar/filtering-bar';
import { CategoriesSidebarComponent } from '../../components/categories-sidebar/categories-sidebar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { QuoteComponent } from '../../components/quote/quote.component';
import { QuoteDto, QuoteService, QuoteStatus, getApiErrorMessages } from '../../core/api';
import { formatAuthor } from '../../core/quote-format';

type QuoteListState =
  | { status: 'loading' }
  | { status: 'error'; messages: string[] }
  | { status: 'loaded'; quotes: QuoteDto[] };

type SortBy = 'mostLiked' | 'recentlyAdded';

const HIDDEN_STATUSES = new Set([QuoteStatus.Rejected, QuoteStatus.Deleted]);

@Component({
  selector: 'app-quote-list',
  standalone: true,
  imports: [
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
  private readonly quoteService = inject(QuoteService);

  protected readonly formatAuthor = formatAuthor;
  protected readonly sortBy = signal<SortBy>('recentlyAdded');
  protected readonly searchTerm = signal('');

  protected readonly state = toSignal(
    this.quoteService.getAll().pipe(
      map((quotes): QuoteListState => ({
        status: 'loaded',
        quotes: quotes.filter((q) => !HIDDEN_STATUSES.has(q.status)),
      })),
      catchError((err) => of<QuoteListState>({ status: 'error', messages: getApiErrorMessages(err) })),
      startWith<QuoteListState>({ status: 'loading' }),
    ),
    { initialValue: { status: 'loading' } as QuoteListState },
  );

  protected readonly visibleQuotes = computed(() => {
    const state = this.state();
    if (state.status !== 'loaded') return [];

    const term = this.searchTerm().trim().toLocaleLowerCase();
    const filtered = term
      ? state.quotes.filter((q) =>
          q.text.toLocaleLowerCase().includes(term) ||
          (q.description?.toLocaleLowerCase().includes(term) ?? false))
      : state.quotes;

    const sorted = [...filtered];
    if (this.sortBy() === 'mostLiked') {
      sorted.sort((a, b) => b.likes.length - a.likes.length);
    } else {
      sorted.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
    }
    return sorted;
  });
}
