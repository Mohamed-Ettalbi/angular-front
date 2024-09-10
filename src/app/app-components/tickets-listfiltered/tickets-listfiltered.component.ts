import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { TicketService } from '../../Services/ticket.service';
import { TicketDTO } from '../../models/dtos/TicketDTO';
import { CommonModule, JsonPipe } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LoginComponent } from '../login/login.component';
import { MatPaginator ,MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Router, RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from '../../Services/auth-service.service';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-tickets-listfiltered',
  standalone: true,
  imports: [MatSortModule,RouterModule,MatButtonModule,
    MatSelectModule
    ,CommonModule
    ,JsonPipe ,
    MatTableModule,
    MatPaginatorModule  ,
     LoginComponent],
  templateUrl: './tickets-listfiltered.component.html',
  styleUrls: ['./tickets-listfiltered.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TicketsListfilteredComponent  implements OnInit , AfterViewInit{
  constructor(private ticketService: TicketService, private router: Router, private authService: AuthService) {}

  ticketDTO: TicketDTO[] = [];
  role : string | undefined;
  email : string | undefined;


  displayedColumns: string[] = ['ticketId', 'title', 'ticketCategoryName','priority', 'status','AssignedTO', 'actions'];
  dataSource = new MatTableDataSource<TicketDTO>([]);

  @ViewChild(MatPaginator)
  paginator !: MatPaginator;

  @ViewChild(MatSort)
  sort !: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;

    this.dataSource.sort = this.sort;

    // this.dataSource.sortingDataAccessor = (item, property) => {
    //   switch (property) {
    //     case 'status':
    //       return this.getStatusOrder(item.status);
    //     default:
    //       return (item as any)[property];
    //   }
    // };

    this.sort.active = 'status';
    this.sort.direction = 'asc';
    this.dataSource.sort = this.sort;
  }

  // getStatusOrder(status: string): number {
  //     const order: { [key: string]: number } = {
  //       'OPEN': 1,
  //       'IN_PROGRESS': 2,
  //       'CLOSED': 3
  //     };
  //     return order[status] || 4;
  // }
  
  

ngOnInit(): void {
  this.setUserRoleAndEmail();

    this.getTickets();
  }

  setUserRoleAndEmail(): void {
    this.role = '';
    this.email = '';
  
    if (this.authService.currentUserValue && this.authService.currentUserValue.token) {
      const decoded = this.authService.decodeToken();
      
      if (decoded) {
        this.role = decoded.role[0]; 
        this.email = decoded.sub;
        console.log('Role:', this.role , 'Email:', this.email);
    } else {
  
      console.log('No token available, user might not be logged in or session expired.');
    }
  }}



  setStatus(ticketId: number, status: string): void {

    if (this.email){

   
    this.ticketService.updateTicketStatus(ticketId, status,this.email ).subscribe({
      next: () => {
          console.log('Ticket status updated successfully');
          this.getTickets(); 
       
      },
      error: (error) => {console.error('Error updating ticket status:', error);
    }
    
  });
  }else console.log('No email available to update ticket status');
  }
takeTicket(ticketId: number ): void {
 const email = this.authService.decodeToken().sub;
this.ticketService.takeTicket(ticketId,email).subscribe({
  next: () => {
    console.log('Ticket taken successfully');
    this.getTickets();
  },
  error: (error) => console.error('Error taking ticket:', error)
});
}








    editTicket(ticketId: number): void {
    this.router.navigate(['/edit', ticketId]);

  }

  deleteTicket(id: number) {
    this.ticketService.deleteTicket(id).subscribe({
   
      next: (response) => {
        if (response.status === 200) {
          console.log('Ticket deleted successfully');
          this.getTickets(); 
        }
      },
      error: (error) => console.error('Error deleting ticket:', error)
    });
   
  }
  assignTicket(ticketId: number): void {
    console.log('Assigning ticket:', ticketId);
  }

  getTickets() {
    const role  = this.authService.decodeToken().role[0];
    console.log(role);
    if(role === 'ROLE_ADMIN'){
      this.ticketService.getTickets().subscribe((tickets) => {
        this.ticketDTO = tickets;
        this.dataSource.data = this.ticketDTO;
        this.paginator?.pageIndex ?? 0;
        this.paginator?.pageSize ?? 5;
        console.log(tickets);
      });

    }else{
  const email =this.authService.decodeToken().sub;
     this.ticketService.getTickets(email).subscribe((tickets) => {
      this.ticketDTO = tickets;
      this.dataSource.data = this.ticketDTO;
      this.paginator?.pageIndex ?? 0;
      this.paginator?.pageSize ?? 5;
      console.log(tickets);
    });
  }
}


unAssignTicket (ticketId: number): void {
  this.ticketService.unAssignTicket(ticketId).subscribe({
    next: () => {
      console.log('Ticket unassigned successfully');
      this.getTickets();
    },
    error: (error) => console.error('Error unassigning ticket:', error)
  });


}
}
