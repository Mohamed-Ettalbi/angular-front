import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}

