import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth-service.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  template: ''
})


export class LogoutComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.logout(); // Call the logout function
    this.router.navigate(['/login']); // Redirect to the login page
  }
}
