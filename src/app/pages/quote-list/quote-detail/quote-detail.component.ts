import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Observable, catchError, forkJoin, map, of, startWith, switchMap } from 'rxjs';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import {
  CategoryDto,
  CategoryService,
  QuoteDto,
  QuoteService,
  QuoteStatus,
  getApiErrorMessages,
} from '../../../core/api';

type QuoteDetailState =
  | { status: 'loading' }
  | { status: 'error'; messages: string[] }
  | { status: 'loaded'; quote: QuoteDto; categories: CategoryDto[] };

const LANGUAGE_NAMES: Record<string, string> = { tr: 'Türkçe', en: 'English' };

@Component({
  selector: 'app-quote-detail',
  standalone: true,
  imports: [NavbarComponent, RouterLink, DatePipe],
  templateUrl: './quote-detail.component.html',
  styleUrl: './quote-detail.component.scss',
})
export class QuoteDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly quoteService = inject(QuoteService);
  private readonly categoryService = inject(CategoryService);

  protected readonly QuoteStatus = QuoteStatus;

  protected readonly state = toSignal(
    this.route.paramMap.pipe(
      map((params) => Number(params.get('id'))),
      switchMap((id) => this.load(id)),
    ),
    { initialValue: { status: 'loading' } as QuoteDetailState },
  );

  protected readonly languageName = computed(() => {
    const s = this.state();
    const code = s.status === 'loaded' ? s.quote.languageCode : null;
    return code ? (LANGUAGE_NAMES[code] ?? code.toUpperCase()) : null;
  });

  private load(id: number): Observable<QuoteDetailState> {
    if (!Number.isInteger(id) || id < 0) {
      return of({ status: 'error', messages: ['Invalid quote id'] });
    }

    return this.quoteService.getById(id).pipe(
      switchMap((quote) => {
        const categoryIds = new Set(quote.quoteCategoryIds.map((c) => c.categoryId));
        const categories$ = categoryIds.size
          ? this.categoryService.getAll().pipe(
              map((all) => all.filter((c) => categoryIds.has(c.id))),
              // Categories are secondary; still show the quote if they fail to load.
              catchError(() => of([] as CategoryDto[])),
            )
          : of([] as CategoryDto[]);

        return forkJoin([of(quote), categories$]);
      }),
      map(([quote, categories]): QuoteDetailState => ({ status: 'loaded', quote, categories })),
      catchError((err) => of<QuoteDetailState>({ status: 'error', messages: getApiErrorMessages(err) })),
      startWith<QuoteDetailState>({ status: 'loading' }),
    );
  }
}
