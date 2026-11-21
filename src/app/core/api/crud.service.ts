import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BaseResponse } from './api.models';


export abstract class CrudService<T, TCreate, TUpdate = TCreate, TId extends string | number = number> {
  protected readonly http = inject(HttpClient);
  protected readonly baseUrl: string;

  protected constructor(resource: string) {
    this.baseUrl = `${environment.apiUrl}/${resource}`;
  }

  getAll(): Observable<T[]> {
    return this.http
      .get<BaseResponse<T[]>>(this.baseUrl)
      .pipe(map((res) => res.data ?? []));
  }

  getById(id: TId): Observable<T> {
    return this.http
      .get<BaseResponse<T>>(`${this.baseUrl}/${id}`)
      .pipe(map((res) => res.data as T));
  }

  create(request: TCreate): Observable<void> {
    return this.http.post<BaseResponse>(this.baseUrl, request).pipe(map(() => undefined));
  }

  update(id: TId, request: TUpdate): Observable<void> {
    return this.http.put<BaseResponse>(`${this.baseUrl}/${id}`, request).pipe(map(() => undefined));
  }

  delete(id: TId): Observable<void> {
    return this.http.delete<BaseResponse>(`${this.baseUrl}/${id}`).pipe(map(() => undefined));
  }
}

// extracts BaseResponse.errorMessage from a failed request, with a fallback
export function getApiErrorMessages(error: unknown): string[] {
  if (error instanceof HttpErrorResponse) {
    const messages = (error.error as BaseResponse | null)?.errorMessage;
    if (messages?.length) return messages;
    if (error.status === 0) return ['Cannot reach the server. Please try again later.'];
    if (error.status === 404) return ['Not found'];
    return [error.message];
  }
  return ['Unexpected error'];
}
