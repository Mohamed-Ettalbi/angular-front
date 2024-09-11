import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentInterface } from '../../models/CommentInterface';
import { CommentService } from '../../Services/comment.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl:'./comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {
  constructor(private commentService: CommentService) {}
 
  @Output() refresh = new EventEmitter<void>(); 
  @Input() comment!: CommentInterface;
  replyContent: string = '';
  replyToCommentId: number | null = null;
  showReplyBox = false;
  editBox = false;

  toggleReplyBox(): void {
    if(this.editBox){
      this.editBox=!this.editBox;
    }
    this.showReplyBox = !this.showReplyBox;
   
  }
  toggleEditBox():void{
    if(this.showReplyBox){
      this.showReplyBox = !this.showReplyBox;    }
    this.editBox = !this.editBox;
  }
  cancelEditBox(){
    this.editBox= !this.editBox;
    this.replyContent='';

  }
  cancelReplyBox(){
  
    this.showReplyBox= !this.showReplyBox;
    this.replyContent='';

  }
  
  updateComment(authorEmail:string, commentId:number){
    this.commentService.updateComment(commentId,authorEmail,this.replyContent)
    .subscribe({
      next: (updatedComment:CommentInterface)=>{
        this.refresh.emit();
        this.comment = updatedComment;

        console.log("the new comment: " ,updatedComment)
        console.log("comment updated successfully");
        this.cancelEditBox();
      },
      error:(error)=>{
        console.error("failed to update comment", error);
      }
    
    });


  }
  deleteComment(commentId: number){
    console.log('trying to delte comment .....');
    console.log("signal emitted");


    this.commentService.deleteComment(commentId).subscribe({

      next: (response)=>{
      
          console.log('Comment deleted successfully', response);
          this.refresh.emit();

              },
      error:(error)=> console.error("Error deleting comment with id :" , error)
    });
  
  }



  submitReply(): void {
    if (this.replyContent.trim()) {
      const reply: Partial<CommentInterface> = {
        message: this.replyContent,
        parrentCommentId: this.comment.id,  
        ticketId: this.comment.ticketId,
        replies: [] 

      };
      console.log(reply);

      this.commentService.addComment(reply.ticketId!, reply.message!, reply.parrentCommentId!)
      .subscribe((newReply: CommentInterface) => {
        if (!this.comment.replies) {
          this.comment.replies = [];  
          
        }
        this.comment.replies.push(newReply);  
        this.replyContent = '';  
        this.showReplyBox = false;  
        this.refresh.emit();
      });
    }
  }
}
