import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {TicketDTO} from '../models/dtos/TicketDTO';
import { CreateTicketDTO } from '../models/dtos/CreateTicketDTO';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private apiUrl = 'http://localhost:8081/api/tickets';
  constructor(private http : HttpClient) {}

  // getTickets(): Observable<TicketDTO[]> {
  //   return this.http.get<TicketDTO[]>(`${this.apiUrl}` , {responseType: 'json'});
  // }
  getTickets(email?: string): Observable<TicketDTO[]> {
    let params = email ? new HttpParams().set('email', email) : {};
    return this.http.get<TicketDTO[]>(`${this.apiUrl}/all`, { params, responseType: 'json' });
  }
  
  getTicketById(id: number): Observable<TicketDTO> {
    return this.http.get<TicketDTO>(`${this.apiUrl}/${id}` , {responseType: 'json'});
 
  }

  createTicket(createTicketDTO: CreateTicketDTO): Observable<TicketDTO> {
    return this.http.post<TicketDTO>(`${this.apiUrl}`,createTicketDTO);
  }

 
  updateTicketStatus(ticketId: number, status: string ,email:string): Observable<any> {
    const statusUpdate = { status: status,
                          statusUpdatedBy: email
     }; // Match the DTO structure
    return this.http.put(`${this.apiUrl}/updateStatus/${ticketId}`, statusUpdate);
  }
  

  editTicket(id: number, createTicketDTO: CreateTicketDTO): Observable<TicketDTO> {
    return this.http.put<TicketDTO>(`${this.apiUrl}/update/${id}`,createTicketDTO);
    
  }

  // deleteticket(id: number): Observable<void> {
  //   console.log('delete ticket');
  //   return this.http.delete<void>(`${this.apiUrl}/delete/${id}` , {responseType: 'json'});
  // }

  deleteTicket(id: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, 
      { 
        observe: 'response',
        responseType: 'text' 
    });
   
  }

  takeTicket(ticketId: number ,email:string): Observable<TicketDTO> {
    
    return this.http.put<TicketDTO>(`${this.apiUrl}/assignment/assignToUser/${ticketId}/${email}`,null);

    }
    unAssignTicket(ticketId: number): Observable<TicketDTO> {
      return this.http.post<TicketDTO>(`${this.apiUrl}/assignment/unassign/${ticketId}`,null);
    }
}