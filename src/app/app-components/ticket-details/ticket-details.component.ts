import { Component, OnInit } from '@angular/core';
import {TicketService } from '../../Services/ticket.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, JsonPipe } from '@angular/common';
import { TicketDTO } from '../../models/dtos/TicketDTO';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommentsComponent } from '../comments/comments.component';

@Component({
  selector: 'app-ticket-details',
  standalone: true,
  imports: [CommentsComponent,RouterModule, MatCardModule,MatButtonModule,CommonModule, JsonPipe],
  templateUrl: './ticket-details.component.html',
  styleUrl: './ticket-details.component.css'
})
export class TicketDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService
  ) {}
  ticket: TicketDTO ={
    ticketId: 0,
    title: 'DEFAULT',
    description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
    ticketCategoryName: '',
    priority:'LOW',
    status: 'OPEN',
    createdAt: '',
    updatedAt: '',
    assignedTo: '',
    assignedGroup: '',
     resolvedAt:'',
      createdBy: ''
  };

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.ticketService.getTicketById(id).subscribe((ticket) => {
        this.ticket = ticket;
        this.ticket.createdBy = ticket.createdBy ? ticket.createdBy : 'Unassigned';

      });
    }
  }
}


