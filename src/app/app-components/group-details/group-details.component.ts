import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserGroupListService } from '../../Services/user-group-list.service';
import { GroupDTO } from '../../models/dtos/GroupDTO';
import { CommonModule, JsonPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';
import {MatExpansionModule} from '@angular/material/expansion';
import { TicketService } from '../../Services/ticket.service';
import { TicketDTO } from '../../models/dtos/TicketDTO';
import { MatButton } from '@angular/material/button';
import { AddTechnicianToGroupComponent } from '../add-technician-to-group/add-technician-to-group.component';
import { MatDialog } from '@angular/material/dialog';





@Component({
  selector: 'app-group-details',
  standalone: true,
  imports: [MatIconModule,MatExpansionModule,MatChipsModule,MatButton,MatCardModule,MatListModule,CommonModule],
  templateUrl: './group-details.component.html',
  styleUrl: './group-details.component.css'
})
export class GroupDetailsComponent implements OnInit {
group:GroupDTO ={
  groupId: 0,
  groupName: '',
  groupDescription: '',
  technicianDTOResponseList: [],
}
allGroupTickets: any[] = [];
ticketsLoaded: boolean = false;
  constructor( 
    private route: ActivatedRoute,
    private groupService:UserGroupListService,
    private ticketService : TicketService,
    public dialog: MatDialog
  ){}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {  
      this.groupService.getGroupById(id).subscribe
      ({
        next:(groupInfo)=>{
          this.group = groupInfo;

        },
      error:(error)=>{
        console.log("there is an error fetching group ", error)
      }
      });
    }

}



  loadGroupTicketsIfNeeded(technicianEmail: string) {
    if (!this.ticketsLoaded) {
      this.ticketService.getTickets(technicianEmail).subscribe({
    
        next: (tickets) => {
          this.allGroupTickets = tickets;
          this.ticketsLoaded = true;
        },
        error: (error) => console.error('Error fetching tickets for the group:', error)
      });
    }
  }

  filterTicketsForTechnician(technicianEmail: string) {
    return this.allGroupTickets.filter(
      ticket => ticket.assignedTo === technicianEmail);
  }
  // removeTechnicianFromGroup(technicianId: number){
  //   console.log('removing technician with id : ',technicianId +'       from current group' 
  //     ,this.group.groupId);
  //     this.group.technicianDTOResponseList = this.group.technicianDTOResponseList.filter(
  //       technician => technician.id !== technicianId
  //     );

      
  // }
  // removeTechnicianFromGroup(technicianId: number): void {
  //   console.log('Removing technician with id:', technicianId, 'from group', this.group.groupId);
  
  //   this.groupService.removeTechnicianFromGroup(technicianId).subscribe({
  //     next: () => {
  //       console.log('Technician removed successfully from the group.');
  
  //       this.group.technicianDTOResponseList = this.group.technicianDTOResponseList.filter(
  //         technician => technician.id !== technicianId
  //       );
  //     },
  //     error: (error) => {
  //       console.error('Error removing technician:', error);
  //     }
  //   });
  // }
  removeTechnicianFromGroup(technicianId: number): void {
    console.log('Removing technician with id:', technicianId, 'from group', this.group.groupId);
  
    const technicianEmail = this.group.technicianDTOResponseList.find(t => t.id === technicianId)?.email;
  
    this.groupService.removeTechnicianFromGroup(technicianId).subscribe({
      next: () => {
        console.log('Technician removed successfully from the group.');
  
        this.group.technicianDTOResponseList = this.group.technicianDTOResponseList.filter(
          technician => technician.id !== technicianId
        );
  
        if (technicianEmail) {
          const ticketsToUnassign = this.filterTicketsForTechnician(technicianEmail);
          console.log('Tickets to unassign:', ticketsToUnassign);
          ticketsToUnassign.forEach(ticket => {
            this.ticketService.unAssignTicket(ticket.ticketId).subscribe({
              next: () => {
                console.log(`Ticket ${ticket.ticketId} unassigned successfully.`);
              },
              error: (error) => console.error(`Error unassigning ticket ${ticket.ticketId}:`, error)
            });
          });
        }
      },
      error: (error) => {
        console.error('Error removing technician:', error);
      }
    });
  }

  
  AddTechnicianToGroup(technicianId: number) {
    console.log("Assigning technician with ID:", technicianId);
    const dialogRef = this.dialog.open(AddTechnicianToGroupComponent, {
      width: '30%',
      data: { technicianId: technicianId }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Technician was assigned to the group:', result);
      }
    });
  }
  
  
  
 
  
}

