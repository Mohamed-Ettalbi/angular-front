import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { UserGroupListService } from '../../Services/user-group-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-group',
  standalone: true,
  imports: [  MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,],
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css']
})
export class EditGroupComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private groupUserListServie: UserGroupListService,
    private snackBar: MatSnackBar,

    private route: ActivatedRoute,
    private router: Router,

  ) { }
  groupId!: number;
  groupForm!: FormGroup;

  ngOnInit(): void {

    this.groupId = Number(this.route.snapshot.paramMap.get('id'));
    this.groupForm = this.fb.group({
      groupName: ['', [Validators.required, Validators.minLength(3)]],
      groupDescription: ['', [Validators.required, Validators.minLength(10)]]
    });

    this.loadGroup();

  }

  loadGroup(){
    this.groupUserListServie.getGroupById(this.groupId).subscribe({
      next: (group) => {
        console.log('Group loaded', group);
        this.groupForm.patchValue(group);
      },
      error: (error) => {
        console.error('Failed to load group', error);
        this.snackBar.open('Failed to load group. Please try again.', 'Close', {
          duration: 3000,
        });
      }
    });
  }
  onSubmit() {
  if (this.groupForm.valid) {
    this.groupUserListServie.updateGroupInfo(this.groupId, this.groupForm.value).subscribe({
      next: (group) => {
        this.snackBar.open('Group updated successfully!', 'Close', {
          duration: 3000,
        });
        console.log('Group updated successfully', group);
        this.router.navigate(['/groups']);
      },
      error: (error) => {
        console.error('Failed to update group', error);
        this.snackBar.open('Failed to update group. Please try again.', 'Close', {
          duration: 3000,
        });
      }
    });
  
  }

  }
}
