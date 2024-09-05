import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../Services/ticket.service';
import { CreateTicketDTO } from '../../models/dtos/CreateTicketDTO';
import {MatSelectModule} from '@angular/material/select';
@Component({
  selector: 'app-create-ticket',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule
  ],
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css'] // Corrected 'styleUrl' to 'styleUrls'
})
export class CreateTicketComponent implements OnInit {
  constructor(private fb: FormBuilder, private ticketService:TicketService) { }

  ticketForm!: FormGroup;
  createTicketDTO !: CreateTicketDTO
  // ngOnInit(): void {
  //   this.ticketForm = this.fb.group({
  //     title: [''],
  //     description: ['']
  //   });
  // }
  ticketCategorynames = [
    { value: 1, name: 'Hardware Issues' },
    { value: 2, name: 'Software Issues' },
    { value: 3, name: 'Bug' },
    { value: 4, name: 'Security' },
    { value: 5, name: 'Network Issues' },
  ]
  ngOnInit(): void {
    this.ticketForm = this.fb.group({
      title: [''],
      description: [''],
      priority: [''], // Add priority field
      ticketCategory: [''] // Add category field
    });
  }
  

//   submit() {
//     if (!this.ticketForm.valid) {
//       console.error('Invalid form');
//       return;
//     }else{
//       this.createTicketDTO={
//         title:this.ticketForm.get('title')?.value,
//         description:this.ticketForm.get('description')?.value,
//         priority: 'LOW',
//         ticketCategory: 2

//       }
    
   
//     this.ticketService.createTicket(this.createTicketDTO).subscribe({
//       next: () => {
//         console.log('Ticket created');
//       },
//       error: (error) => {
//         console.error('Failed to create ticket', error);
//       }
//     });
//     console.log('DTO sent :', this.createTicketDTO);

//   }
// }
submit() {
  if (!this.ticketForm.valid) {
    console.error('Invalid form');
    return;
  } else {
    this.createTicketDTO = {
      title: this.ticketForm.get('title')?.value,
      description: this.ticketForm.get('description')?.value,
      priority: this.ticketForm.get('priority')?.value, // Retrieve priority value
      ticketCategory: this.ticketForm.get('ticketCategory')?.value // Retrieve category value
    }

    this.ticketService.createTicket(this.createTicketDTO).subscribe({
      next: () => {
        console.log('Ticket created');
      },
      error: (error) => {
        console.error('Failed to create ticket', error);
      }
    });
    console.log('DTO sent :', this.createTicketDTO);
  }
}


}
