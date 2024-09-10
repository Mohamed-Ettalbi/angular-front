import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommentInterface } from '../models/CommentInterface';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:8081/api/comments';
  constructor(private http: HttpClient) {}

  getCommentsByTicketId(ticketId: number): Observable<CommentInterface[]> {
    return this.http.get<CommentInterface[]>(`${this.apiUrl}/${ticketId}`);
  }

  addComment(ticketId: number, content: string, commentParrentID: number | null): Observable<CommentInterface> {
    const payload = { content, commentParrentID };
    return this.http.post<CommentInterface>(`${this.apiUrl}/${ticketId}`, payload);
  }

  updateComment( commentId: number, email:string, content: string): Observable<CommentInterface> {

    console.log( "sending :" ,content)
    return this.http.put<CommentInterface>(`${this.apiUrl}/update/${commentId}`,  content );
  }

  deleteComment(commentId: number):  Observable<HttpResponse<any>> {
    return this.http.delete(`${this.apiUrl}/delete/${commentId}` , 
      { 
      observe: 'response',
      responseType: 'text' 
  });
  }
}
