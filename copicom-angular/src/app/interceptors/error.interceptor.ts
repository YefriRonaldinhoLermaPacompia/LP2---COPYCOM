import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../providers/services/auth/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = '';

      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else {
        switch (error.status) {
          case 401:
            errorMessage = 'No autorizado. Por favor inicia sesión.';
            authService.logout(); // Limpiar token al recibir 401
            // Evitar redirecciones múltiples
            if (!router.url.includes('/authentication/login')) {
              router.navigate(['/authentication/login']);
            }
            break;
          case 403:
            errorMessage = 'Acceso prohibido.';
            break;
          case 404:
            errorMessage = 'Recurso no encontrado.';
            break;
          case 500:
            errorMessage = 'Error interno del servidor.';
            break;
          default:
            errorMessage = `Error ${error.status}: ${error.message}`;
        }
      }

      console.error('Error capturado por interceptor:', errorMessage);
      return throwError(() => new Error(errorMessage));
    })
  );
};
