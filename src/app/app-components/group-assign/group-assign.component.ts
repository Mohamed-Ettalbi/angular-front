import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { UserGroupListService } from '../../Services/user-group-list.service';
import { CommonModule } from '@angular/common';
import { GroupDTO } from '../../models/dtos/GroupDTO';
import { TechnicianDTO } from '../../models/dtos/TechnicianDTO';
import { TicketService } from '../../Services/ticket.service';
import { ActivatedRoute } from '@angular/router';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';


@Component({
  selector: 'app-group-assign',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatStepperModule,
    CommonModule
  ],
  templateUrl: './group-assign.component.html',
  styleUrls:[ './group-assign.component.css'], providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ]
  
})
export class GroupAssignComponent {

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  groups: GroupDTO[] = [];
  technicians: TechnicianDTO[] = [];
  currentGroup!: GroupDTO ;
  allGroupTickets: any []= [];
  ticketsLoaded: boolean = false;
  currentTechnician!: TechnicianDTO;
  ticketId!:number;
  isGroupAssigned: boolean = false; 

  constructor(private ticketService :TicketService,    private route: ActivatedRoute,

    private formBuilder: FormBuilder, private groupService: UserGroupListService) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.ticketId = id

    this.firstFormGroup = this.formBuilder.group({
      groupControl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      technicianControl: ['', Validators.required]
    });
    this.loadGroups();
  }

  loadGroups() {
    this.groupService.getAllGroups().subscribe({
      next: (groups) => {
        this.groups = groups;
      },
      error: (error) => console.error('Error fetching groups', error)
    });
  }
  onTechnicianSelect(email:string){
        const foundTechnician = this.technicians.find(tech => tech.email === email);
        if (foundTechnician) {
          this.currentTechnician = foundTechnician;
          this.loadGroupTicketsIfNeeded(email)
        } else {
          console.error('Technician not found.');
        }

    
  }
  onGroupSelect(groupId: number) {
    this.groupService.getGroupById(groupId).subscribe({
      next: (group) => {
        console.log(group);  // Debugging line to inspect this.isGroupAssigned = true;object
        if (group) {
          this.currentGroup = group;
          this.technicians = group.technicianDTOResponseList;
          this.isGroupAssigned = false;
          console.log('group assigne is ', this.isGroupAssigned)


                } else {
          console.error('Group data is undefined.');
        }
      },
      error: (error) => {
        console.error('Error fetching technicians for group', error);
      }
    });
  }
  assignToGroupOnly(){

    const groupId =this.currentGroup.groupId
    this.ticketService.assignTicketToGroup(this.ticketId, groupId).subscribe({
      next: (ticket) => {
        console.log('Ticket assigned successfully:', ticket);
        this.isGroupAssigned = true;
        console.log('group assigne is ', this.isGroupAssigned)

      },
      error: (error) => {
        console.error('Failed to assign ticket:', error);
      }
    });

  }

  assignTicket() {
    const technicianEmail =this.currentTechnician.email
    console.log('Assigning ticket to technician optonal : ',technicianEmail);
    
    this.ticketService.assignTicketToUser(this.ticketId, technicianEmail).subscribe({
      next: (ticket) => {
        console.log('Ticket assigned to user successfully:', ticket);
      },
      error: (error) => {
        console.error('Failed to assign ticket to user:', error);
      }
    });
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
}


