
export interface BaseResponse<T = never> {
  data?: T | null;
  errorMessage?: string[] | null;
}

/** Common/BaseEntity<T> */
export interface BaseEntity<TId = number> {
  id: TId;
  createdAt: string;
  updatedAt?: string | null;
}

// ---- Categories ------------------------------------------------------------

export interface CategoryDto extends BaseEntity {
  name: string;
  description?: string | null;
}

export interface CreateCategoryRequest {
  name: string;
  description?: string | null;
}

export type UpdateCategoryRequest = CreateCategoryRequest;

// ---- Quotes ----------------------------------------------------------------

export enum QuoteStatus {
  Pending = 0,
  Approved = 1,
  Rejected = 2,
  Deleted = 99,
}

export interface QuoteCategoryDto {
  quoteId: number;
  categoryId: number;
}

export interface QuoteLikeDto {
  quoteId: number;
  userId: number;
  createdAt: string;
}

export interface QuoteDto extends BaseEntity {
  text: string;
  description?: string | null;
  languageCode?: string | null;
  createdByUserId: number;
  authorId?: number | null;
  authorName?: string | null;
  sourceId?: number | null;
  status: QuoteStatus;
  quoteGroupId?: number | null;
  quoteCategoryIds: QuoteCategoryDto[];
  likes: QuoteLikeDto[];
}

export interface CreateQuoteRequest {
  text: string;
  description?: string | null;
  languageCode: string;
  authorId?: number | null;
  sourceId?: number | null;
  quoteGroupId?: number | null;
  categoryIds?: number[] | null;
}

export type UpdateQuoteRequest = CreateQuoteRequest;
