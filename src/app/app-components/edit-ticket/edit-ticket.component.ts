
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../Services/ticket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketDTO } from '../../models/dtos/TicketDTO';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { AuthService } from '../../Services/auth-service.service';


@Component({
  selector: 'app-edit-ticket',
  standalone: true,
  imports: [
    FileUploadComponent,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule
  ],
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.css']
})
export class EditTicketComponent implements OnInit {
  ticketForm!: FormGroup;
  ticketId!: number;

  @ViewChild(FileUploadComponent) fileUploadComponent!: FileUploadComponent;

  selectedFiles: FileList | null = null;


  constructor(
    private fb: FormBuilder,
    private ticketService: TicketService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}


  ticketCategorynames = [
    { value: 1, name: 'Hardware Issues' },
    { value: 2, name: 'Software Issues' },
    { value: 3, name: 'Bug' },
    { value: 4, name: 'Security' },
    { value: 5, name: 'Network Issues' },
  ]

  ngOnInit(): void {
    this.ticketId = Number(this.route.snapshot.paramMap.get('id'));
    this.ticketForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      priority: ['', Validators.required], 
      ticketCategory: ['', Validators.required] 
    });

    this.loadTicket();
  }


  loadTicket(): void {
    this.ticketService.getTicketById(this.ticketId).subscribe({
      next: (ticket: TicketDTO) => {
        console.log('Ticket loaded', ticket);
        const category = this.ticketCategorynames.find(cat => cat.name === ticket.ticketCategoryName);
        const categoryId = category ? category.value : null;
        this.ticketForm.patchValue(ticket);
        this.ticketForm.patchValue({ticketCategory: categoryId});

      },
      error: (error) => {
        console.error('Failed to load ticket', error);
      }
    });
  }
  handleFilesReady(files: FileList | null): void {
    this.selectedFiles = files; 
  }
 
  
  submit(): void {
    if (!this.ticketForm.valid) {
      console.error('Invalid form');
      return;
    }
    if (this.selectedFiles && this.fileUploadComponent) {
      this.fileUploadComponent.uploadFiles(); // Trigger file upload on form submit
    }

    this.ticketService.editTicket(this.ticketId, this.ticketForm.value).subscribe({
      next: () => {
        console.log('Ticket updated');
        
        const role = this.authService.decodeToken().role[0];
        console.log('Role:', role);
        if (role === 'ROLE_EMPLOYEE') {

          this.router.navigate(['/tickets']);

        }else{

        this.router.navigate(['/rolebasedtickets']);
      }

       
      },
      error: (error: any) => {
        console.error('Failed to update ticket', error);
      }
    });
  }
  

 
}  