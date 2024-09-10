import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import {AuthResponse} from '../models/auth-response'
import { Credentials } from '../models/Credentials';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService{
  
  private currentUserSubject: BehaviorSubject<User | any>;
  public currentUser: Observable<User>;

  private apiUrl = 'http://localhost:8081/api/auth';
  constructor(
    private router: Router,
    private http: HttpClient,
    public jwtHelper: JwtHelperService

  
  ) {
    this.currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): AuthResponse {
    return this.currentUserSubject.value;
  }


  register(user: User): Observable<AuthResponse>{ 
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, user);
  }
 
  
  login(credentials: Credentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      map((user: AuthResponse) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
  })
);



  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
  scheduleAutoLogout() {
    const token =this.currentUserValue ? this.currentUserValue.token : null;
    console.log('Token:', token);
   
    if (token) {
      const expirationDate = this.jwtHelper.getTokenExpirationDate(token);
      console.log('Expiration Date:', expirationDate);
      if (expirationDate) {
        const timeout = expirationDate.getTime() - Date.now(); 
        console.log('Timeout:', timeout);
  
        if (timeout > 0) {

          setTimeout(() => this.logout(), timeout);
          
        }
        console.log("your session has timed out")
     
    }
  }
  

}
public decodeToken(): any {
  const token = this.currentUserValue ? this.currentUserValue.token : null;
  if (token) {
    const decoded=  this.jwtHelper.decodeToken(token);
    if (decoded && decoded.role && decoded.role.length > 0) {
      return decoded; 
  }

  }
  return null;
}
}
