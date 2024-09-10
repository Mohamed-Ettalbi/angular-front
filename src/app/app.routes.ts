import { Routes } from '@angular/router';
import { LoginComponent } from './app-components/login/login.component';
import { RegisterComponent } from './app-components/register/register.component';
import { TicketsComponent } from './app-components/tickets/tickets.component';
import { AuthGuard } from './helpers/auth.guard';
import { LogoutComponent } from './app-components/logout/logout.component';
import { HeaderComponent } from './app-components/header/header.component';
import { SidenavComponent } from './app-components/sidenav/sidenav.component';
import { TicketDetailsComponent } from './app-components/ticket-details/ticket-details.component';
import { CreateTicketComponent } from './app-components/create-ticket/create-ticket.component';
import { EditTicketComponent } from './app-components/edit-ticket/edit-ticket.component';
import { TicketsListfilteredComponent } from './app-components/tickets-listfiltered/tickets-listfiltered.component';

export const routes: Routes = [
    {
            path: '',
            redirectTo: 'login',
            pathMatch: 'full'
    },
    {
         path: 'tickets/:id',
        component: TicketDetailsComponent , 
    },

  
    {
        path:'login',
        component: LoginComponent
    },{

        path: 'rolebasedtickets',
        component: TicketsListfilteredComponent
    },
    {
        path: 'register',
        component: RegisterComponent

    },
    {
        // canActivate: [AuthGuard],
        path: 'tickets',
        component: TicketsComponent
    },
    {
        path:'create',
        component: CreateTicketComponent
    },
    {
        path: 'logout',
        component: LogoutComponent
    },
    {
        path: 'edit/:id',
        component: EditTicketComponent
    },
    {
        path:'header',
        component: HeaderComponent
    },
    {
        path :'side',
        component: SidenavComponent

  }
];
