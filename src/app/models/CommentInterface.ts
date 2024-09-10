export interface CommentInterface {
    id: number;
    ticketId: number;  
    message: string;
    createdAt: Date;
    updatedAt?: Date;
    authorEmail: string;
    parrentCommentId?: number; 
    replies: CommentInterface[]; 
  }
  