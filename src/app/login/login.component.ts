import { Component } from '@angular/core';
import { Creds } from '../models/auth-response';
import { AuthService } from '../Services/auth-service.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  credential: Creds = {
    username:'',
    password:''
  };

  constructor(private authService: AuthService, private router: Router) {}

  login(){
    this.authService.login(this.credential).subscribe(

      (response)=>{

        console.log ("Login susccessfull", response)
        localStorage.setItem('token', response.token)
        this.router.navigate([''])
      },
      (error: HttpErrorResponse) => {

        console.error('Login failed', error);
        alert('Login failed. Please check your credentials.');
      }

    )


  }

  

  

    



}
