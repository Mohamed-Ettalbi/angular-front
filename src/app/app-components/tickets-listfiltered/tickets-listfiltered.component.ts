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
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tickets-listfiltered',
  standalone: true,
  imports: [FormsModule,MatCheckboxModule,MatTabsModule,MatSortModule,RouterModule,MatButtonModule,
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
  
  currentStatusFilter = 'OPEN'; 
  filterAssignedToMe = false; 

  displayedColumns: string[] = ['ticketId', 'title', 'ticketCategoryName','priority', 'status','assignedGroup','AssignedTO', 'actions'];
  dataSource = new MatTableDataSource<TicketDTO>([]);

  @ViewChild(MatPaginator)
  paginator !: MatPaginator;

  @ViewChild(MatSort)
  sort !: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;

    this.dataSource.sort = this.sort;

  

    this.sort.active = 'ticketId';
    this.sort.direction = 'asc';
    this.dataSource.sort = this.sort;
  }

  
  // onTabChange(index: number) {
  //   this.currentStatusFilter = index === 0 ? 'OPEN' : 'CLOSED';
  //   this.applyFilters();
  // }
  onTabChange(index: number): void {
    const statuses = ['OPEN', 'IN_PROGRESS', 'CLOSED','']; 
    this.currentStatusFilter = statuses[index];
    this.applyFilters();
  }
  
  applyFilters() {
    this.dataSource.data = this.ticketDTO.filter(ticket => {
      const matchesStatus = this.currentStatusFilter ? ticket.status === this.currentStatusFilter : true;
      const matchesTechnician = !this.filterAssignedToMe || ticket.assignedTo === this.email;
      return matchesStatus && matchesTechnician;
    });
  }
  

ngOnInit(): void {
  this.setUserRoleAndEmail();

    this.getTickets();
    this.applyFilters();
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
    this.router.navigate(['/assignticket', ticketId]);
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
        this.applyFilters();

        console.log(tickets);
      });

    }else{
  const email =this.authService.decodeToken().sub;
     this.ticketService.getTickets(email).subscribe((tickets) => {
      this.ticketDTO = tickets;
      this.applyFilters();
      this.dataSource.data = this.ticketDTO;
      this.paginator?.pageIndex ?? 0;
      this.paginator?.pageSize ?? 5;
      this.applyFilters();

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
