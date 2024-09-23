// import { Component, Inject } from '@angular/core';
// import { MatDialogRef, MAT_DIALOG_DATA, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
// import { CommonModule } from '@angular/common';
// import { MatListModule } from '@angular/material/list';
// import { MatButtonModule } from '@angular/material/button';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-technician-dialog',
//   standalone: true,
//   imports: [CommonModule, MatListModule ,MatDialogActions,FormsModule,MatButtonModule, MatDialogContent],
//   template: `
//     <h2 mat-dialog-title>Select Technicians</h2>
//     <mat-dialog-content>
//       <mat-selection-list [(ngModel)]="selectedTechnicians">
//         <mat-list-option *ngFor="let tech of technicians" [value]="tech">
//           {{ tech.firstName }} {{ tech.lastName }}
//         </mat-list-option>
//       </mat-selection-list>
//     </mat-dialog-content>
//     <mat-dialog-actions>
//       <button mat-button (click)="onClose()">Close</button>
//       <button mat-button (click)="onSelect()">Add Technicians</button>
//     </mat-dialog-actions>
//   `,
//   styles: []
// })
// export class TechnicianDialogComponent {
//   selectedTechnicians: any[] = [];

//   constructor(
//     public dialogRef: MatDialogRef<TechnicianDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public technicians: any[] // Pass technicians list
//   ) {}

//   onSelect() {
//     this.dialogRef.close(this.selectedTechnicians); // Return selected technicians
//   }

//   onClose() {
//     this.dialogRef.close();
//   }
// }
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-technician-dialog',
  standalone: true,
  imports: [CommonModule, MatListModule, MatButtonModule, FormsModule],
  templateUrl: './technician-dialog.component.html',
  styleUrls: ['./technician-dialog.component.css']
   
})
export class TechnicianDialogComponent {
  selectedTechnicians: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<TechnicianDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public technicians: any[] // Pass technicians list
  ) {}

  onSelect() {
    this.dialogRef.close(this.selectedTechnicians); 
    console.log('Selected technicians In the dialog:', this.selectedTechnicians);
  }

  onClose() {
    this.dialogRef.close();
  }
}
