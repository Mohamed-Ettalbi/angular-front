import { Routes } from '@angular/router';
import { LoginComponent } from './app-components/login/login.component';
import { RegisterComponent } from './app-components/register/register.component';
import { DashboardComponent } from './app-components/dashboard/dashboard.component';
import { AuthGuard } from './helpers/auth.guard';
import { LogoutComponent } from './app-components/logout/logout.component';
import { HeaderComponent } from './app-components/header/header.component';

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
        canActivate: [AuthGuard],
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'logout',
        component: LogoutComponent
    },
    {
        path:'header',
        component: HeaderComponent
    }
];
