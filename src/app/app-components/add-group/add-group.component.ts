// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { UserGroupListService } from '../../Services/user-group-list.service';
// import { AddGroupDTO } from '../../models/dtos/AddGroupDTO'
// import { CommonModule } from '@angular/common';
// import {MatFormFieldModule} from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';


// @Component({
//   selector: 'app-add-group',
//   standalone: true,
//   imports: [CommonModule,MatFormFieldModule, MatInputModule,MatFormFieldModule,ReactiveFormsModule],
//   templateUrl: './add-group.component.html',
//   styleUrls: ['./add-group.component.css']
// })
// export class AddGroupComponent implements OnInit {
//   constructor(
//     private fb: FormBuilder,
//     private groupService: UserGroupListService, 
//     private snackBar: MatSnackBar 
//   ){}
//   addGroupForm!: FormGroup;  
//       ngOnInit(): void {
//     this.addGroupForm = this.fb.group({
//       groupName: ['', [Validators.required, Validators.minLength(3)]],
//       groupDescription: ['', [Validators.required, Validators.minLength(10)]]
//     });  }
//     onSubmit() {
//       if (this.addGroupForm.valid) {
//         const addGroupDto: AddGroupDTO = this.addGroupForm.value;
        
//         this.groupService.addGroup(addGroupDto).subscribe({
//           next: (group) => {
//             this.snackBar.open('Group added successfully!', 'Close', {
//               duration: 3000,
//             });
//             console.log('Group added successfully', group);
         
//             this.addGroupForm.reset();
//             this.addGroupForm.markAsPristine();
//             this.addGroupForm.markAsUntouched();
            
//             console.log('group From is being reset and marked and untouched');
//           },       
            
         
//           error: (error) => {
//             console.error('Failed to add group', error);
//             this.snackBar.open('Failed to add group. Please try again.', 'Close', {
//               duration: 3000,
//             });
//           }
//         });
//       }
//     }
    


// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog
import { UserGroupListService } from '../../Services/user-group-list.service';
import { AddGroupDTO } from '../../models/dtos/AddGroupDTO';
import { TechnicianDialogComponent } from '../technician-dialog/technician-dialog.component'; // Import TechnicianDialogComponent
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TechnicianDTO } from '../../models/dtos/TechnicianDTO';

@Component({
  selector: 'app-add-group',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {
  addGroupForm!: FormGroup;
  selectedTechnicians: TechnicianDTO[] = [];
  availableTechnicians: TechnicianDTO[] = [];

  constructor(
    private fb: FormBuilder,
    private groupService: UserGroupListService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog 
  ) {}

  ngOnInit(): void {
    this.addGroupForm = this.fb.group({
      groupName: ['', [Validators.required, Validators.minLength(3)]],
      groupDescription: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if (this.addGroupForm.valid) {
      const addGroupDto: AddGroupDTO = this.addGroupForm.value;

      this.groupService.addGroup(addGroupDto).subscribe({
        next: (group) => {
          this.snackBar.open('Group added successfully!', 'Close', { duration: 3000 });
          console.log('Group added successfully', group);
          this.addGroupForm.reset({
            groupName: '',
            groupDescription: ''
          });
          this.addGroupForm.markAsUntouched();
        },
        error: (error) => {
          console.error('Failed to add group', error);
          this.snackBar.open('Failed to add group. Please try again.', 'Close', { duration: 3000 });
        }
      });
    }
  }

  openTechnicianDialog(): void {
    this.groupService.getAllTechnicians().subscribe({ 
      next: (technicians) => {
        this.availableTechnicians = technicians;
        console.log('Fetched technicians:',  this.availableTechnicians );

        const dialogRef = this.dialog.open(TechnicianDialogComponent, {
          width: '40%',
          data: this.availableTechnicians
        });
    
        dialogRef.afterClosed().subscribe((selected) => {
          if (selected) {
            this.selectedTechnicians = selected;
            console.log('Selected Technicians:', this.selectedTechnicians);
          }
        });
      },
      error: (error) => console.error('Failed to fetch technicians', error)
    });

   
  }
}
