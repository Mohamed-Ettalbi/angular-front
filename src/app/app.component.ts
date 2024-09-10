import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './app-components/header/header.component';
import { SidenavComponent } from './app-components/sidenav/sidenav.component';
import { AuthService } from './Services/auth-service.service';
import { QuillModule } from 'ngx-quill';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,RouterOutlet ,QuillModule, HeaderComponent, SidenavComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-front';
  private roleInterval: any;

  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    this.authService.scheduleAutoLogout();

    this.roleInterval = setInterval(() => {
      this.displayRole();
    }, 5000);
  }
  displayRole(): void {
    const role = this.authService.decodeToken().role[0];
    console.log('Role:', role);
  }


  isLoggedIn() {
    if(this.authService.currentUserValue){
      return true;
    }
    return false;
  }
  sidenavOpened = true;

  toggleSidenav() {
    this.sidenavOpened = !this.sidenavOpened;
  }

}