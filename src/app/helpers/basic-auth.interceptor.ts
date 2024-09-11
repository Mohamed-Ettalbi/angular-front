
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../Services/auth-service.service';
import { inject } from '@angular/core';

export const basicAuthInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);

  const currentUser = authService.currentUserValue;
  const isLoggedIn = currentUser && currentUser.token;
  const isApiUrl = req.url.startsWith("http://localhost:8081/api");

  if (isLoggedIn && isApiUrl) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    });
  }

  return next(req);
};

