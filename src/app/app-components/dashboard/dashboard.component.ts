import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TicketService } from '../../Services/ticket.service';
import { TicketDTO } from '../../models/dtos/TicketDTO';
import { CommonModule, JsonPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,JsonPipe , MatTableModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent  {
  constructor(private ticketService: TicketService) {}
  ticketDTO: TicketDTO[] = [];

  displayedColumns: string[] = ['ticketId', 'title', 'ticketCategoryName','priority', 'status'];
  dataSource = this.ticketDTO;



  getTickets() {
     this.ticketService.getTickets().subscribe((tickets) => {
      this.ticketDTO = tickets;
      this.dataSource = this.ticketDTO;
      console.log(tickets);
    });
  }



}
