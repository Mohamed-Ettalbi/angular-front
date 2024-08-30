import { Component, OnInit } from '@angular/core';
import { Credentials } from '../../models/Credentials';
import { AuthService } from '../../Services/auth-service.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms'; // Add NgForm import

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  credential: Credentials = {
    username:'',
    password:''
  };
  loginForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router ,private fb: FormBuilder){}
  ngOnInit(): void {
this.loginForm = this.fb.group({

  username: ['' , [Validators.required, Validators.email]],
  password: ['' , [Validators.required, Validators.minLength(8), Validators.maxLength(64)]]
  });
  }

login(){
  if (this.loginForm.valid)
    {
      this.credential = this.loginForm.value;
        this.authService.login(this.credential).subscribe(

          (response)=>{

            console.log ("Login susccessfull", response)
            localStorage.setItem('token', response.token)
            this.router.navigate(['/dashboard']);
          },
          (error: HttpErrorResponse) => {

            console.error('Login failed', error);
            alert('Login failed. Please check your credentials.');
          }

        )


      }
}
}


