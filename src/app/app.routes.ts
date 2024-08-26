import { Routes } from '@angular/router';
import { LoginComponent } from './app-components/login/login.component';
import { RegisterComponent } from './app-components/register/register.component';

export const routes: Routes = [

  
    {
        path:'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent

    },
];
