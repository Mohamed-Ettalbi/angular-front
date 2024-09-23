import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../Services/auth-service.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('AuthGuard: Checking access for route:', state.url);
  
    // Get the current decoded token/user details
    const currentUser = this.authService.decodeToken();
    console.log('AuthGuard: Decoded token:', currentUser);
  
    // Check if user is logged in (token exists)
    if (currentUser) {
      console.log('AuthGuard: User is logged in.');
  
      const requiredRoles = route.data['roles'] as Array<string>;
      console.log('AuthGuard: Required roles for this route:', requiredRoles);
  
      // If roles are defined for this route, ensure the user has one of them
      if (requiredRoles && requiredRoles.length > 0) {
        console.log('AuthGuard: Checking if user has required roles.');
  
        // Safely check if the 'role' property exists in the token
        const userRoles = currentUser['role'];
        console.log('AuthGuard: User roles from token:', userRoles);
  
        // Ensure userRoles is defined and is an array
        if (!Array.isArray(userRoles) || userRoles.length === 0) {
          console.log('AuthGuard: No valid roles found in the user token.');
          this.router.navigate(['/unauthorized']);
          return false;
        }
  
        // Check if any of the required roles are present in the user's roles
        const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));
        console.log('AuthGuard: Does user have required role?', hasRequiredRole);
  
        if (!hasRequiredRole) {
          console.log('AuthGuard: User does not have required roles. Redirecting to unauthorized page.');
          this.router.navigate(['/unauthorized']);
          return false;
        }
      }
  
      // User is logged in and has the required role(s)
      console.log('AuthGuard: User has required role(s). Access granted.');
      return true;
    }
  
    // If the user is not logged in, redirect to the login page
    console.log('AuthGuard: User is not logged in. Redirecting to login page.');
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}