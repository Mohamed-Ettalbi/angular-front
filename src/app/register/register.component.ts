import { Component } from '@angular/core';
import { User } from '../models/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResponse } from '../models/auth-response';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../Services/auth-service.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports:  [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private authService: AuthService ,  private router: Router) {}

  user : User = new User(); 

  register(){

    this.authService.register(this.user).subscribe( 
      (response: AuthResponse) => {
        console.log('Login successful', response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['']);
      },
      (error: HttpErrorResponse) => {
        console.error('Registration failed', error);
        if (error.status === 400) {
          alert('Bad Request: Please check the input values.');
        } else if (error.status === 409) {
          alert('Conflict: Email already exists.');
        } else {
          alert('An unexpected error occurred. Please try again later.');
      


    }
  });


}
}
