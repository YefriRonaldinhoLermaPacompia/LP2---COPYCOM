import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const urlInterceptor: HttpInterceptorFn = (req, next) => {

  // No modificar peticiones de recursos estáticos
  if (
    req.url.startsWith('./assets') ||
    req.url.startsWith('assets') ||
    req.url.endsWith('.svg') ||
    req.url.endsWith('.png') ||
    req.url.endsWith('.jpg') ||
    req.url.endsWith('.css') ||
    req.url.endsWith('.js') ||
    req.url.endsWith('.json') ||
    req.url.endsWith('.html')
  ) {
    return next(req);
  }

  // Solo modificar peticiones REST
  if (!req.url.startsWith('http')) {
    return next(
      req.clone({
        url: environment.url + req.url
      })
    );
  }

  return next(req);
};
