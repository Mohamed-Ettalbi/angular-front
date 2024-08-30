import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthResponse } from '../../models/auth-response';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../Services/auth-service.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { passwordValidator } from './passwordValidator';


@Component({
  selector: 'app-register',
  standalone: true,
  imports:  [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService ,  private router: Router , private fb: FormBuilder) {}


  user : User = new User(); 
    registerForm!: FormGroup;


  roles = [ 
    { value: 'EMPLOYEE', label: 'Employee' },
    { value: 'TECHNICIAN', label: 'Technician' },
     ];

     ngOnInit(): void {
      this.registerForm= this.fb.group({
        firstName: ['' , [Validators.required, Validators.minLength(3) , Validators.maxLength(50)]],
        lastName: ['' , [Validators.required, Validators.minLength(3) , Validators.maxLength(50)]],
        phone:['' , [Validators.required, Validators.pattern('^\\d{10}$')]],
        email: ['', [Validators.required, Validators.email] ],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(64), passwordValidator()] ],
        role: ['' , [Validators.required]],
      });
     }


  register(){
    if (this.registerForm.valid) {
      this.user = this.registerForm.value;
      console.log(this.user);

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
else{alert('Please fill in all the fields correctly');}
}
}
