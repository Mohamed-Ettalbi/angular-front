import { Component, OnInit } from '@angular/core';
import { GroupDTO } from '../../models/dtos/GroupDTO';
import { UserGroupListService } from '../../Services/user-group-list.service';
import { TicketService } from '../../Services/ticket.service';
import { TicketDTO } from '../../models/dtos/TicketDTO';
import { AuthService } from '../../Services/auth-service.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-group-details-for-technician',
  standalone: true,
  imports: [MatIconModule,MatExpansionModule,MatChipsModule,MatButton,MatCardModule,MatListModule,CommonModule],
  templateUrl: './group-details-for-technician.component.html',
  styleUrls:[ './group-details-for-technician.component.css']
})
export class GroupDetailsForTechnicianComponent implements OnInit {
  group: GroupDTO = {
    groupId: 0,
    groupName: '',
    groupDescription: '',
    technicianDTOResponseList: [],
  };

  allGroupTickets: TicketDTO[] = [];
  technicianEmail: string = '';
  ticketsLoaded: boolean = false;

  constructor(
    private groupService: UserGroupListService,
    private ticketService: TicketService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Get the technician's email from the logged-in user's token
    const token = this.authService.decodeToken();
    this.technicianEmail = token?.sub; // Assuming 'sub' contains the email

    // Call the function to load the group details (ID 0 to trigger technician logic on the backend)
    this.groupService.getGroupById(0).subscribe({
      next: (groupInfo) => {
        this.group = groupInfo;
        console.log('Group info:', this.group);

        // Load tickets assigned to the technician in this group
        this.loadGroupTicketsByTechnicianEmail(this.technicianEmail);
      },
      error: (error) => {
        console.error('Error fetching group details:', error);
      }
    });
  }

  // Function to load all group tickets assigned to the technician's email
  loadGroupTicketsByTechnicianEmail(technicianEmail: string) {
    if (!this.ticketsLoaded) {
      this.ticketService.getTickets(technicianEmail).subscribe({
        next: (tickets) => {
          this.allGroupTickets = tickets;
          this.ticketsLoaded = true;
          console.log('All tickets for technician in group:', this.allGroupTickets);
        },
        error: (error) => {
          console.error('Error fetching tickets for the technician:', error);
        }
      });
    }
  }
  filterTicketsForTechnician(technicianEmail: string) {
    return this.allGroupTickets.filter(
      ticket => ticket.assignedTo === technicianEmail);
  }

  // If needed, you can add any filtering logic here or use this to display tickets in the template
}
