import { Routes } from '@angular/router';
import { LoginComponent } from './app-components/login/login.component';
import { RegisterComponent } from './app-components/register/register.component';
import { DashboardComponent } from './app-components/dashboard/dashboard.component';

export const routes: Routes = [
    {
            path: '',
            redirectTo: 'login',
            pathMatch: 'full'
    },

  
    {
        path:'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent

    },
    {
        path: 'dashboard',
        component: DashboardComponent
    }
];
