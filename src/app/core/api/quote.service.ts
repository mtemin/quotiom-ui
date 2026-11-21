import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { CreateQuoteRequest, QuoteDto, UpdateQuoteRequest } from './api.models';

@Injectable({ providedIn: 'root' })
export class QuoteService extends CrudService<QuoteDto, CreateQuoteRequest, UpdateQuoteRequest> {
  constructor() {
    super('quote');
  }
}
