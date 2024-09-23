import { Component, OnInit, ViewChild } from '@angular/core';
import { GroupDTO } from '../../models/dtos/GroupDTO';
import { UserGroupListService } from '../../Services/user-group-list.service';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator ,MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort'; 
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TechnicianDTO } from '../../models/dtos/TechnicianDTO';
import { TechnicianDialogComponent } from '../technician-dialog/technician-dialog.component';

@Component({
  selector: 'app-group-list',
  standalone: true,
  imports: [CommonModule,MatIconModule,MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit{
  displayedColumns: string[] = ['groupId', 'groupName', 'groupDescription', 'details','update','delete','addTechnicians'];
  dataSource = new MatTableDataSource<GroupDTO>();  
  selectedTechnicians: TechnicianDTO[] = [];
  availableTechnicians: TechnicianDTO[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(    private dialog: MatDialog,
    private groupService: UserGroupListService ,
    private router:Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.loadGroups();  // Call loadGroups to fetch and populate table on component initialization
  }

  loadGroups(): void {
    this.groupService.getAllGroups().subscribe({
      next: (groups) => {
        this.dataSource.data = groups;  // Set data for dataSource
        this.dataSource.paginator = this.paginator;  // Assign paginator
        this.dataSource.sort = this.sort;  // Assign sorting functionality
      },
      error: (error) => console.error('There was an error fetching the groups', error)
    });
  }
  
  redirectToDetails(groupId: number){
    console.log('the group id is : ',groupId)
    this.router.navigate(['/groupdetails',groupId])
  }


  redirectToUpdate(groupId: number){
this.router.navigate(['/editgroup',groupId])
  }
  
  // openTechnicianDialog(): void {
  //   this.groupService.getAllTechnicians().subscribe({ 
  //     next: (technicians) => {
  //       this.availableTechnicians = technicians;
  //       console.log('In the List component Fetched technicians: ',  this.availableTechnicians );

  //       const dialogRef = this.dialog.open(TechnicianDialogComponent, {
  //         width: '40%',
  //         data: this.availableTechnicians
  //       });
    
  //       dialogRef.afterClosed().subscribe((selected) => {
  //         if (selected) {
  //           this.selectedTechnicians = selected;
  //           console.log('Selected Technicians:', this.selectedTechnicians);
  //         }
  //       });
  //     },
  //     error: (error) => console.error('Failed to fetch technicians', error)
  //   });

   
  // }
  openTechnicianDialog(groupId: number): void {
    
  this.groupService.getAllTechnicians().subscribe({ 
      next: (technicians) => {
        this.availableTechnicians = technicians;
        console.log('In the List component Fetched technicians: ',  this.availableTechnicians );

        const dialogRef = this.dialog.open(TechnicianDialogComponent, {
          width: '40%',
          data: this.availableTechnicians
        });
    
        dialogRef.afterClosed().subscribe((selected: TechnicianDTO[]) => {
          if (selected) {
        console.log('Selected Technicians:', selected);
        selected.forEach(tech => {
          this.assignTechnicianToGroup(groupId, tech.id);
        
        });}
        });
      },
          error: (error) => console.error('Failed to fetch technicians', error)
        });

  }
  
  assignTechnicianToGroup(groupId: number, technicianId: number) {
    this.groupService.addTechnicianToGroup(groupId, technicianId).subscribe({
      next: (response) => {
        console.log(`Technician ID: ${technicianId} added to group ID: ${groupId}`);
      },
      error: (error) => {
        console.error(`Failed to add Technician ID: ${technicianId} to group ID: ${groupId}`, error);
      }
    });
  }
  
  



  deleteGroup(groupId: number){


    console.log("clicked delete button")
    this.groupService.deleteGroup(groupId).subscribe({
      next: (response) => {
        console.log('Group deleted successfully', response);
        this.loadGroups();  
      },
      error: (error) => console.error('There was an error deleting the group', error)
    });
  }
}
 
 






