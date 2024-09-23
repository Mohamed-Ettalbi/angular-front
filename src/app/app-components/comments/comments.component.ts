import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../../Services/comment.service';
import { CommentInterface } from '../../models/CommentInterface';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms'; // Add this line
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [JsonPipe, CommentComponent,FormsModule,CommonModule, ReactiveFormsModule],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() ticketId!: number;
 comments: CommentInterface[] = [];

  commentForm!: FormGroup;  
  submissionError = false;

  constructor(private httpClient: HttpClient, private fb: FormBuilder, private commentsService: CommentService) {}

  ngOnInit(): void {
    this.loadComments();

    this.commentForm = this.fb.group({
      comment: ['', [Validators.minLength(2), Validators.maxLength(500)]], // Validators should be in an array
    });
  }

  loadComments(): void {
    this.commentsService.getCommentsByTicketId(this.ticketId)
    .subscribe({
      next: (comments) => {
        this.comments = comments.map(comment => ({
          ...comment,
          replies: comment.replies || [] 
        }));
      },
      error: (err) => {
        console.error('Error loading comments', err);
      }
    });
}
  

 
  onSubmit(): void {
    if (this.commentForm.valid) {
const content = this.commentForm.get('comment')?.value;

      this.commentsService.addComment(this.ticketId, content , null).subscribe({
        next: (comment : CommentInterface) => {
          this.comments.push(comment);
          this.commentForm.reset();
          this.submissionError = false;  
        },
        error: (err : HttpErrorResponse) => {
          this.submissionError = true; 
          console.error('Error submitting comment', err);
        }
      });
    }
  }
  replyToCommentId: number | null = null;
  replyContent:string = '';


  showReplyBox(commentId: number): void {
    console.log('reply butto pressed the parent id is :', commentId);
 this.replyToCommentId = commentId;
}
submitReply(commentId: number): void {

  
  this.commentsService.addComment(this.ticketId, this.replyContent, this.replyToCommentId).subscribe({
    next: (comment : CommentInterface) => {
      this.loadComments();
      this.commentForm.reset();
      this.submissionError = false;  
    },
    error: (err : HttpErrorResponse) => {
      this.submissionError = true; 
      console.error('Error submitting comment', err);
    }
  });
}
handlerefresh(): void {
  console.log("this function has been called ")
  this.loadComments();
}
}
