import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Quote } from '../models/Quote';

// import { environment } from '../../environments/environment';
// import { Quote } from '../models/quote.model';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private readonly baseUrl = `${environment.apiUrl}/quotes`;

  private readonly http = inject(HttpClient);

  getQuotes(): Observable<Quote[]> {
    return this.http.get<Quote[]>(this.baseUrl);
  }

  getQuoteById(id: number): Observable<Quote> {
    return this.http.get<Quote>(`${this.baseUrl}/${id}`);
  }

  createQuote(quote: Omit<Quote, 'id'>): Observable<Quote> {
    return this.http.post<Quote>(this.baseUrl, quote);
  }

  updateQuote(id: number, quote: Partial<Omit<Quote, 'id'>>): Observable<Quote> {
    return this.http.patch<Quote>(`${this.baseUrl}/${id}`, quote);
  }

  deleteQuote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}