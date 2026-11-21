
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

