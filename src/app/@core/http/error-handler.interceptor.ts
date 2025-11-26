import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger } from '../logger.service';

const log = new Logger('ErrorHandlerInterceptor');

/**
 * Adds a default error handler to all requests.
 * Provides specific handling for 404 errors.
 */
@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((error) => this.errorHandler(error)));
  }

  // Customize the default error handler here if needed
  private errorHandler(error: HttpErrorResponse): Observable<HttpEvent<any>> {
    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 404:
          errorMessage = `Resource not found (404): ${error.url}`;
          log.error('404 Not Found', { url: error.url, message: error.message });
          break;
        case 401:
          errorMessage = 'Unauthorized access (401)';
          break;
        case 403:
          errorMessage = 'Forbidden (403)';
          break;
        case 500:
          errorMessage = 'Internal server error (500)';
          break;
        default:
          errorMessage = `Server Error (${error.status}): ${error.message}`;
      }
    }

    if (!environment.production) {
      log.error('Request error', { status: error.status, message: errorMessage, error });
    }

    return throwError(() => new Error(errorMessage));
  }
}
