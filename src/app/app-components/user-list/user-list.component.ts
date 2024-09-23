
import { Component } from '@angular/core';
import { UserGroupListService } from '../../Services/user-group-list.service';
import { UserDTO } from '../../models/dtos/UserDTO';
import { JsonPipe } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AddTechnicianToGroupComponent } from '../add-technician-to-group/add-technician-to-group.component';
import {MatDialogModule} from '@angular/material/dialog';
import { TechnicianDTO } from '../../models/dtos/TechnicianDTO';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [JsonPipe,MatDialogModule,MatButtonModule,MatIconModule,MatTabsModule, MatTableModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  users: UserDTO[] | TechnicianDTO[]= [];
  displayedColumnsForTechnicians =['firstName', 'lastName', 'email', 'phone', 'role','AddToGroup'];
  displayedColumns = ['firstName', 'lastName', 'email', 'phone', 'role'];
  dataSource = new MatTableDataSource<UserDTO>();
  constructor(private userGroupListService: UserGroupListService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.userGroupListService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
       this.dataSource.data = this.users; 
        console.log('Fetched users:', this.users);
      },
      error: (err) => console.error('Failed to fetch users', err)
    });
  }
  onTabChange(index: number) {
    switch (index) {
      case 0: 
        this.dataSource.data = this.users;
        break;
      case 1: 
        this.dataSource.data = this.users.filter(user => user.role === '[ROLE_TECHNICIAN]');
        break;
      case 2: 
        this.dataSource.data = this.users.filter(user => user.role === '[ROLE_EMPLOYEE]');
        break;
    }
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
