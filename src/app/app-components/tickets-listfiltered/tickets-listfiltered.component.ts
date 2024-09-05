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
@Component({
  selector: 'app-tickets-listfiltered',
  standalone: true,
  imports: [MatSortModule,RouterModule,MatButtonModule,CommonModule,JsonPipe ,MatTableModule,MatPaginatorModule  , LoginComponent],
  templateUrl: './tickets-listfiltered.component.html',
  styleUrls: ['./tickets-listfiltered.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TicketsListfilteredComponent  implements OnInit , AfterViewInit{
  constructor(private ticketService: TicketService, private router: Router, private authService: AuthService) {}

  ticketDTO: TicketDTO[] = [];

  displayedColumns: string[] = ['ticketId', 'title', 'ticketCategoryName','priority', 'status', 'actions'];
  dataSource = new MatTableDataSource<TicketDTO>([]);

  @ViewChild(MatPaginator)
  paginator !: MatPaginator;

  @ViewChild(MatSort)
  sort !: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;

    this.dataSource.sort = this.sort;

    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'status':
          return this.getStatusOrder(item.status);
        default:
          return (item as any)[property];
      }
    };

    this.sort.active = 'status';
    this.sort.direction = 'asc';
    this.dataSource.sort = this.sort;
  }

  getStatusOrder(status: string): number {
      const order: { [key: string]: number } = {
        'OPEN': 1,
        'IN_PROGRESS': 2,
        'CLOSED': 3
      };
      return order[status] || 4;
  }

ngOnInit(): void {
    this.getTickets();
  }
    editTicket(ticketId: number): void {
    this.router.navigate(['/edit', ticketId]);
  }

  deleteTicket(id: number): void {
    // this.ticketService.deleteticket(id).subscribe({
    //   next: (response: HttpResponse<any>) => {
       
    //     console.log('Ticket deleted successfully.');
    //     console.log('Status code:', response.status);
        
    //   },
    //   error: (error) => {
    //     console.error('Error deleting ticket:', error);
       
    //   }
    // });
    console.log('Ticket deleted successfully.');
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




}
