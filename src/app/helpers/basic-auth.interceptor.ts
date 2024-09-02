// import { Injectable } from '@angular/core';
// import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { AuthService } from '../Services/auth-service.service';

// @Injectable()
// export class BasicAuthInterceptor implements HttpInterceptor {
//     constructor(private authService: AuthService) {}

//     intercept(request: HttpRequest<string>, next: HttpHandler): Observable<HttpEvent<string>> {
//         // Get the token from authService.currentUserValue
//         const currentUser = this.authService.currentUserValue;
//         const isLoggedIn = currentUser && currentUser.token;
//         const isApiUrl = request.url.startsWith("http://localhost:8081/api");
//         if (isLoggedIn && isApiUrl) {

//             request = request.clone({
//                 setHeaders: {
//                     Authorization: `Bearer ${currentUser.token}`
//                 }
//             });
//         }

//         return next.handle(request);
//     }
// }
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

