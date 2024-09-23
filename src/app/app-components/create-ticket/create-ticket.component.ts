// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { MatCardModule } from '@angular/material/card';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { CommonModule } from '@angular/common';
// import { TicketService } from '../../Services/ticket.service';
// import { CreateTicketDTO } from '../../models/dtos/CreateTicketDTO';
// import {MatSelectModule} from '@angular/material/select';
// import { FileUploadComponent } from '../file-upload/file-upload.component';
// import { Router } from '@angular/router';
// import { AuthService } from '../../Services/auth-service.service';

// @Component({
//   selector: 'app-create-ticket',
//   standalone: true,
//   imports: [FileUploadComponent,
//     MatCardModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatButtonModule,
//     ReactiveFormsModule,
//     CommonModule,
//     MatSelectModule
//   ],
//   templateUrl: './create-ticket.component.html',
//   styleUrls: ['./create-ticket.component.css'] // Corrected 'styleUrl' to 'styleUrls'
// })
// export class CreateTicketComponent implements OnInit {
//   constructor(private authService: AuthService,
//     private fb: FormBuilder, private ticketService:TicketService, private router: Router) { }

//   ticketForm!: FormGroup;
//   createTicketDTO !: CreateTicketDTO

  
//   // ngOnInit(): void {
//   //   this.ticketForm = this.fb.group({
//   //     title: [''],
//   //     description: ['']
//   //   });
//   // }
//   ticketCategorynames = [
//     { value: 1, name: 'Hardware Issues' },
//     { value: 2, name: 'Software Issues' },
//     { value: 3, name: 'Bug' },
//     { value: 4, name: 'Security' },
//     { value: 5, name: 'Network Issues' },
//   ]
//   ngOnInit(): void {
//     this.ticketForm = this.fb.group({
//       title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
//       description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
//       priority: ['', Validators.required], 
//       ticketCategory: ['', Validators.required] 
//     });
//   }
  


// submit() {
//   if (!this.ticketForm.valid) {
//     console.error('Invalid form');
//     return;
//   } else {
//     this.createTicketDTO = {
//       title: this.ticketForm.get('title')?.value,
//       description: this.ticketForm.get('description')?.value,
//       priority: this.ticketForm.get('priority')?.value, 
//       ticketCategory: this.ticketForm.get('ticketCategory')?.value 
//     }

//     this.ticketService.createTicket(this.createTicketDTO).subscribe({
//       next: () => {
//         console.log('Ticket created');
//         const role = this.authService.decodeToken().role[0];
//         console.log('Role:', role);
//         if (role === 'ROLE_EMPLOYEE') {

//           this.router.navigate(['/tickets']);

//         }else{

//         this.router.navigate(['/rolebasedtickets']);
//       }

//       },
//       error: (error) => {
//         console.error('Failed to create ticket', error);
//       }
//     });
//     console.log('DTO sent :', this.createTicketDTO);
//   }
// }


// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../Services/ticket.service';
import { CreateTicketDTO } from '../../models/dtos/CreateTicketDTO';
import { MatSelectModule } from '@angular/material/select';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth-service.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Import Snackbar

@Component({
  selector: 'app-create-ticket',
  standalone: true,
  imports: [
    FileUploadComponent,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule,
    MatSnackBarModule // Import MatSnackBarModule
  ],
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent implements OnInit {
  ticketForm!: FormGroup;
  createTicketDTO!: CreateTicketDTO;
  
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private ticketService: TicketService,
    private router: Router,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) { }

  ticketCategorynames = [
    { value: 1, name: 'Hardware Issues' },
    { value: 2, name: 'Software Issues' },
    { value: 3, name: 'Bug' },
    { value: 4, name: 'Security' },
    { value: 5, name: 'Network Issues' },
  ];

  ngOnInit(): void {
    this.ticketForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      priority: ['', Validators.required], 
      ticketCategory: ['', Validators.required] 
    });
  }

  submit() {
    if (!this.ticketForm.valid) {
      this.snackBar.open('Please fill out all required fields correctly!', 'Close', { duration: 3000 }); // Show error
      return;
    } else {
      this.createTicketDTO = {
        title: this.ticketForm.get('title')?.value,
        description: this.ticketForm.get('description')?.value,
        priority: this.ticketForm.get('priority')?.value, 
        ticketCategory: this.ticketForm.get('ticketCategory')?.value 
      };

      this.ticketService.createTicket(this.createTicketDTO).subscribe({
        next: () => {
          this.snackBar.open('Ticket created successfully!', 'Close', { duration: 3000 }); // Show success
          const role = this.authService.decodeToken().role[0];
          if (role === 'ROLE_EMPLOYEE') {
            this.router.navigate(['/tickets']);
          } else {
            this.router.navigate(['/rolebasedtickets']);
          }
        },
        error: (error) => {
          this.snackBar.open('Failed to create ticket. Please try again.', 'Close', { duration: 3000 }); // Show error
          console.error('Failed to create ticket', error);
        }
      });
    }
  }
}

