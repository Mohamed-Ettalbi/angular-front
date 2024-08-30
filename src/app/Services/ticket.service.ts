import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {TicketDTO} from '../models/dtos/TicketDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private apiUrl = 'http://localhost:8081/api/tickets';
  constructor(private http : HttpClient) {}

  getTickets(): Observable<TicketDTO[]> {
    return this.http.get<TicketDTO[]>(`${this.apiUrl}` , {responseType: 'json'});
  }
}
