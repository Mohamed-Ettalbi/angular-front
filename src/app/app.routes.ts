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
import { UserListComponent } from './app-components/user-list/user-list.component';
import { GroupListComponent } from './app-components/group-list/group-list.component';
import { GroupDetailsComponent } from './app-components/group-details/group-details.component';
import { GroupAssignComponent } from './app-components/group-assign/group-assign.component';
import { AddGroupComponent } from './app-components/add-group/add-group.component';
import { EditGroupComponent } from './app-components/edit-group/edit-group.component';
import { UnauthorizedComponent } from './app-components/unauthorized/unauthorized.component';
import { GroupDetailsForTechnicianComponent } from './app-components/group-details-for-technician/group-details-for-technician.component';

export const routes: Routes = [
//     {
//             path: '',
//             redirectTo: 'login',
//             pathMatch: 'full'
//     },
//     {
//          path: 'tickets/:id',
//         component: TicketDetailsComponent , 
//     },{
//         path:'users',
//         component: UserListComponent
//     },{
//         path: 'groups',
//         component: GroupListComponent
//     },{

//         path:'groupdetails/:id',
//         component:GroupDetailsComponent
//     },{

//         path:'assignticket/:id',
//         component:GroupAssignComponent
//     },{
//         path: 'creategroup',
//         component: AddGroupComponent
//     },{
//         path: 'editgroup/:id',
//         component: EditGroupComponent
//     },

  
//     {
//         path:'login',
//         component: LoginComponent
//     },{

//         path: 'rolebasedtickets',
//         component: TicketsListfilteredComponent
//     },
//     {
//         path: 'register',
//         component: RegisterComponent

//     },
//     {
//         // canActivate: [AuthGuard],
//         path: 'tickets',
//         component: TicketsComponent
//     },
//     {
//         path:'create',
//         component: CreateTicketComponent
//     },
//     {
//         path: 'logout',
//         component: LogoutComponent
//     },
//     {
//         path: 'edit/:id',
//         component: EditTicketComponent
//     },
//     {
//         path:'header',
//         component: HeaderComponent
//     },
//     {
//         path :'side',
//         component: SidenavComponent

//   }
// ];

// {
//     path: '',
//     redirectTo: 'login',
//     pathMatch: 'full'
//   },
//   {
//     path: 'tickets/:id',
//     component: TicketDetailsComponent,
//     canActivate: [AuthGuard],
//     data: { roles: ['EMPLOYEE', 'ADMIN'] }  // Only 'USER' and 'ADMIN' roles can access this route
//   },
//   {
//     path: 'users',
//     component: UserListComponent,
//     canActivate: [AuthGuard],
//     data: { roles: ['ADMIN'] }  // Only 'ADMIN' can access this route
//   },
//   {
//     path: 'groups',
//     component: GroupListComponent,
//     canActivate: [AuthGuard],
//     data: { roles: ['ADMIN'] }  // Only 'ADMIN' can access this route
//   },
//   {
//     path: 'groupdetails/:id',
//     component: GroupDetailsComponent,
//     canActivate: [AuthGuard],
//     data: { roles: ['ADMIN'] }
//   },
//   {
//     path: 'assignticket/:id',
//     component: GroupAssignComponent,
//     canActivate: [AuthGuard],
//     data: { roles: ['ADMIN'] }
//   },
//   {
//     path: 'creategroup',
//     component: AddGroupComponent,
//     canActivate: [AuthGuard],
//     data: { roles: ['ADMIN'] }
//   },
//   {
//     path: 'editgroup/:id',
//     component: EditGroupComponent,
//     canActivate: [AuthGuard],
//     data: { roles: ['ADMIN'] }
//   },
//   {
//     path: 'login',
//     component: LoginComponent
//   },
//   {
//     path: 'rolebasedtickets',
//     component: TicketsListfilteredComponent,
//     canActivate: [AuthGuard],
//     data: { roles: ['ADMIN', 'TECHNICIAN'] }
//   },
//   {
//     path: 'register',
//     component: RegisterComponent
//   },
//   {
//     path: 'tickets',
//     component: TicketsComponent,
//     canActivate: [AuthGuard],
//     data: { roles: ['EMPLOYEE', 'ADMIN'] }
//   },
//   {
//     path: 'create',
//     component: CreateTicketComponent,
//     canActivate: [AuthGuard],
//     data: { roles: ['EMPLOYEE', 'ADMIN'] }
//   },
//   {
//     path: 'logout',
//     component: LogoutComponent,
//     canActivate: [AuthGuard],
//     data: { roles: ['EMPLOYEE','TECHNICIAN', 'ADMIN'] }
//   },
//   {
//     path: 'edit/:id',
//     component: EditTicketComponent,
//     canActivate: [AuthGuard],
//     data: { roles: ['ADMIN','EMPLOYEE'] }
//   },
//   {
//     path: 'header',
//     component: HeaderComponent,
//     canActivate: [AuthGuard],
//     data: { roles: ['USER', 'ADMIN','TECHNICIAN'] }
//   },
//   {
//     path: 'side',
//     component: SidenavComponent,
//     canActivate: [AuthGuard],
//     data: { roles: ['USER', 'ADMIN','TECHNICIAN'] }
//   },  {
//     path: 'unauthorized',
//     component: UnauthorizedComponent
//   },
//   {
//     path: '**',
//     redirectTo: 'login'
//   }
// ];
{
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'tickets/:id',
    component: TicketDetailsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_EMPLOYEE','ROLE_TECHNICIAN', 'ROLE_ADMIN'] }  // Only 'ROLE_EMPLOYEE' and 'ROLE_ADMIN' roles can access this route
  },
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] }  // Only 'ROLE_ADMIN' can access this route
  },
  {
    path: 'groups',
    component: GroupListComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN','ROLE_TECHNICIAN'] }  // Only 'ROLE_ADMIN' can access this route
  },
  {
    path: 'groupdetails/:id',
    component: GroupDetailsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] }
  },
  {
    path: 'assignticket/:id',
    component: GroupAssignComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] }
  },
  {
    path: 'creategroup',
    component: AddGroupComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] }
  },
  {
    path: 'editgroup/:id',
    component: EditGroupComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] }
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'rolebasedtickets',
    component: TicketsListfilteredComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN', 'ROLE_TECHNICIAN'] }
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'tickets',
    component: TicketsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_EMPLOYEE','ROLE_TECHNICIAN', 'ROLE_ADMIN'] }
  },
  {
    path: 'create',
    component: CreateTicketComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_EMPLOYEE', 'ROLE_ADMIN'] }
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_EMPLOYEE', 'ROLE_TECHNICIAN', 'ROLE_ADMIN'] }
  },
  {
    path: 'edit/:id',
    component: EditTicketComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE'] }
  },
  {
    path: 'header',
    component: HeaderComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE', 'ROLE_TECHNICIAN'] }
  },
  {
    path: 'side',
    component: SidenavComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE', 'ROLE_TECHNICIAN'] }
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },{
    path:'grouptech',
    component: GroupDetailsForTechnicianComponent,
  },
  {
    path: '**',
    redirectTo: 'login'
  }
  
];