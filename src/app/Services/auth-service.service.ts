import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import {Creds,AuthResponse} from '../models/auth-response'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  private apiUrl = 'http://localhost:8081/api/auth';
  constructor(private http : HttpClient) { }

  register(user: User): Observable<AuthResponse>{ 
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, user);

  }
 
  
  login(credentials: Creds): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials);
  }
  


}
