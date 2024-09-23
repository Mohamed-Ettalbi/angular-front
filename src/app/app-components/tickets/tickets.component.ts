import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { TicketService } from '../../Services/ticket.service';
import { TicketDTO } from '../../models/dtos/TicketDTO';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator ,MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Router, RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AuthService } from '../../Services/auth-service.service';
import { ErrorResponseInterface } from '../../models/ErrorResponseInterface';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [MatSortModule,MatTabsModule,  MatTableModule,FormsModule,
    RouterModule,
    MatButtonModule,
    CommonModule,
     MatTableModule,
     MatPaginatorModule  ],
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TicketsComponent  implements OnInit , AfterViewInit{
  constructor(private cdr: ChangeDetectorRef ,private ticketService: TicketService, private router: Router, private authService: AuthService) {}

  ticketDTO: TicketDTO[] = [];

  displayedColumns: string[] = ['ticketId', 'title', 'ticketCategoryName','priority', 'status', 'actions'];
  dataSource = new MatTableDataSource<TicketDTO>([]);
  currentStatusFilter = 'OPEN'; 

  @ViewChild(MatPaginator)
  paginator !: MatPaginator;

  @ViewChild(MatSort)
  sort !: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;


    // this.dataSource.sortingDataAccessor = (item, property) => {
    //   switch (property) {
    //     case 'status':
    //       return this.getStatusOrder(item.status);
    //     default:
    //       return (item as any)[property];
    //   }
    // };



    this.sort.active = 'ticketId';
    this.sort.direction = 'asc';
    this.dataSource.sort = this.sort;
    this.cdr.detectChanges(); 
  }
  onTabChange(index: number): void {
    const statuses = ['OPEN', 'IN_PROGRESS', 'CLOSED','']; 
    this.currentStatusFilter = statuses[index];
    this.applyFilters();
  }
  
  applyFilters() {
    this.dataSource.data = this.ticketDTO.filter(ticket => {
      const matchesStatus = this.currentStatusFilter ? ticket.status === this.currentStatusFilter : true;
      return matchesStatus ;
    });
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
  const role = this.authService.decodeToken().role[0];
  console.log('Role:', role);
  if (role === 'ROLE_EMPLOYEE') {

    this.router.navigate(['/tickets']);

  }else{

  this.router.navigate(['/rolebasedtickets']);
}
    this.getTickets();
  }


    editTicket(ticketId: number): void {
    this.router.navigate(['/edit', ticketId]);
  }

 
  deleteTicket(id: number) {
    this.ticketService.deleteTicket(id).subscribe({
   
      next: () => {
      
        
          console.log('Ticket deleted successfully');
          this.getTickets(); 
        
      },
      error: (errorResponse : HttpErrorResponse) =>{
         console.error('Error deleting ticket:', errorResponse)
         const error: ErrorResponseInterface = errorResponse.error;
         console.error('Error:', error);

        }
    });
   
  }

  getTickets() {

    // const role  = this.authService.decodeToken().role[0];
    // console.log(role);
    // if(role === 'ROLE_ADMIN'){
    //   this.ticketService.getTickets().subscribe((tickets) => {
    //     this.ticketDTO = tickets;
    //     this.dataSource.data = this.ticketDTO;
    //     this.paginator?.pageIndex ?? 0;
    //     this.paginator?.pageSize ?? 5;
    //     console.log(tickets);
    //   });

    // }else{
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
