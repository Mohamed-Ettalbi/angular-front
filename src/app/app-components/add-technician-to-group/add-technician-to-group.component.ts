import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GroupDTO } from '../../models/dtos/GroupDTO';
import { UserGroupListService } from '../../Services/user-group-list.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../Services/auth-service.service';




@Component({
  selector: 'app-add-technician-to-group',
  standalone: true,
  imports: [FormsModule,MatFormFieldModule,MatInputModule,MatListModule,MatDialogModule,CommonModule],
  templateUrl: './add-technician-to-group.component.html',
  styleUrls:['./add-technician-to-group.component.css']
})
export class AddTechnicianToGroupComponent {
  groups: GroupDTO[] = [];
  filteredGroups: GroupDTO[] = [];
  technicianId!: number;

  constructor(
    private usergroupService: UserGroupListService,
    public dialogRef: MatDialogRef<AddTechnicianToGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { technicianId: number } 
  ) {
    this.technicianId = data.technicianId; 
  }
  ngOnInit() {
    this.usergroupService.getAllGroups().subscribe(groups => {
      this.groups = groups;
      this.filteredGroups  = this.groups;
    });
  }

  selectGroup(group: GroupDTO) {

console.log ('selected the group with the name ....: ', group)
console.log('and curent technician id is  : ' ,this.technicianId)

this.usergroupService.addTechnicianToGroup(group.groupId, this.technicianId).subscribe({
  next: (response) => {
    if (response.status === 200) { 
      console.log('Technician assigned to group successfully!', response.body);
      this.dialogRef.close(group); 
    }
  },
  error: (err) => {
    console.error('Error assigning technician to group:', err);
  }
});
  }
  filterGroups(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (!filterValue) {
      this.filteredGroups = this.groups; 
    } else {
      this.filteredGroups = this.groups.filter(group => 
        group.groupName.toLowerCase().includes(filterValue)
      );
    }
  }

}

  
