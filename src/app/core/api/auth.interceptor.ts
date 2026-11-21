import { HttpInterceptorFn } from '@angular/common/http';
import { PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';

export const ACCESS_TOKEN_KEY = 'accessToken';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith(environment.apiUrl) || !isPlatformBrowser(inject(PLATFORM_ID))) {
    return next(req);
  }

  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (!token) return next(req);

  return next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
};
