// // import { ApplicationConfig } from '@angular/core';
// // import { provideRouter } from '@angular/router';

// // import { routes } from './app.routes';
// // import { provideHttpClient, withInterceptors } from '@angular/common/http';
// // import { basicAuthInterceptor } from './helpers/basic-auth.interceptor';

// // export const appConfig: ApplicationConfig = {
// //   providers: [provideRouter(routes),
// //     provideHttpClient(withInterceptors([basicAuthInterceptor]))
// //   ]
// // };
// import { ApplicationConfig } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { routes } from './app.routes';
// import { provideHttpClient, withInterceptors } from '@angular/common/http';
// import { basicAuthInterceptor } from './helpers/basic-auth.interceptor';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideRouter(routes),
//     provideHttpClient(withInterceptors([basicAuthInterceptor])),

    
//   ]
// };
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { basicAuthInterceptor } from './helpers/basic-auth.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthService } from './Services/auth-service.service';
import {  tokenGetterFunction } from './helpers/token-getter';

export function jwtOptionsFactory(authService: AuthService) {
  return {
    tokenGetter:  tokenGetterFunction,
  };
}


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([basicAuthInterceptor])),
    provideAnimations(),
    JwtHelperService,
    {
      provide: JWT_OPTIONS, 
      useFactory: jwtOptionsFactory, 
    
    }
  ]
};



