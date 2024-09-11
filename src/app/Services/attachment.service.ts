import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AttachmentDTO } from '../models/dtos/AttachmentDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {

  constructor(private http: HttpClient) { }


  private apiUrl = 'http://localhost:8081/api/attachment';


  uploadFile(ticketId: number, formData: FormData) {
    return this.http.post(`${this.apiUrl}/uploadFile/${ticketId}`, formData);
  }
  uploadMultipleFiles(ticketId: number, formData: FormData) {
    return this.http.post(`${this.apiUrl}/uploadMultipleFiles/${ticketId}`, formData);
  }

  getAttachmentsByTicketId(ticketId: number): Observable<AttachmentDTO[]> {
    return this.http.get<AttachmentDTO[]>(`${this.apiUrl}/attachments/${ticketId}`);
  }

  deleteAttachemntByid(attachmentId: number) :  Observable<HttpResponse<any>> {
      return this.http.delete(`${this.apiUrl}/delete/${attachmentId}`,
      { 
        observe: 'response',
        responseType: 'text' 
    });
  }

}


