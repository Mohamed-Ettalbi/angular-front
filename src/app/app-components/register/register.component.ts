import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthResponse } from '../../models/auth-response';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../Services/auth-service.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { passwordValidator } from './passwordValidator';
import { ErrorResponseInterface } from '../../models/ErrorResponseInterface';


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
        confirmPassword: ['', [Validators.required]],
        role: ['' , [Validators.required]],
      }, {
        validator: this.passwordMatchValidator // Apply the custom validator here
      });
    }
  
    // Custom validator to check if passwords match
    passwordMatchValidator(formGroup: FormGroup) {
      const password = formGroup.get('password')?.value;
      const confirmPassword = formGroup.get('confirmPassword')?.value;
  
      if (password !== confirmPassword) {
        formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      } else {
        formGroup.get('confirmPassword')?.setErrors(null);
      }
    }
  

  register(){
    this.registerForm.markAllAsTouched(); 

    if (this.registerForm.invalid) {
      
      const firstInvalidControl: HTMLElement = document.querySelector('form .ng-invalid')!;
      firstInvalidControl.focus();
      alert('Please fill in all fields correctly.');
      return; 
    }
      this.user = this.registerForm.value;
      console.log(this.user);

    this.authService.register(this.user).subscribe( 
      (response: AuthResponse) => {
        console.log('Register successful', response);
        this.router.navigate(['']);
      },
      (errorResponse: HttpErrorResponse) => {

        const error: ErrorResponseInterface = errorResponse.error;


        console.error('Registration failed', error);
        if (error.statusCode === 400) {
          alert('Bad Request: Please check the input values.');
        } else if (error.statusCode === 409) {
         console.log (error.statusCode)
          alert('conflict ' + error.message);;
        } else {
          console.log(error.statusCode)
          alert('An unexpected error occurred. Please try again later.');
    }
  });


}

}
