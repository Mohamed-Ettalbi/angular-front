import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth-service.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports:[ MatButtonModule, 
    MatIconModule,
    RouterModule,
    MatSidenavModule, 
    MatToolbarModule,
    MatListModule,
    CommonModule
     ],

  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

  @Input() opened = true; // Sidenav open state passed from the parent

  constructor(private authService: AuthService) { }

  toggleSidenav() {
    this.opened = !this.opened;
    console.log('button clicked')
  }
  hasRole(allowedRoles: string[]): boolean {
    const currentUser = this.authService.decodeToken();
    const userRole = currentUser?.role[0]; // Assuming the role is in an array, adjust this based on your token structure
    return allowedRoles.includes(userRole);
  }
}
