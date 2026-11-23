import { QuoteDto } from './api';

export function formatAuthor(quote: Pick<QuoteDto, 'authorId'>): string {
  return quote.authorId != null ? `Author #${quote.authorId}` : 'Unknown author';
}
