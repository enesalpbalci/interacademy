import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { MainComponent } from './layout/components/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
const routes: Routes = [
  // home
  { path: '', redirectTo: '', pathMatch: 'full', component: MainComponent, canActivate : [LoginGuard] }, 

  // user
  {
    path: 'users',
    loadChildren: () =>
      import('./pages/users/users.module').then((e) => e.UsersModule), canActivate : [LoginGuard]
  },
  //role
  {
    path: 'roles',
    loadChildren: () =>
      import('./pages/role/role.module').then((e) => e.RoleModule), canActivate : [LoginGuard]
  },
  //facility
  {
    path: 'facilities',
    loadChildren: () =>
      import('./pages/facility/facility.module').then((e) => e.FacilityModule), canActivate : [LoginGuard]
  },
  //group
  {
    path: 'groups',
    loadChildren: () =>
      import('./pages/group/group.module').then((e) => e.GroupModule), canActivate : [LoginGuard]
  },
  //payment
  {
    path: 'payments',
    loadChildren: () =>
      import('./pages/payments/payments.module').then((e) => e.PaymentsModule), canActivate : [LoginGuard]
  },
  //payment-durations
  {
    path: 'paymentdurations',
    loadChildren: () =>
      import('./pages/payment/payment-duration.module').then((e) => e.PaymentDurationModule), canActivate : [LoginGuard]
  },
  //contract
  {
    path: 'contracts',
    loadChildren: () =>
      import('./pages/contract/contract.module').then((e) => e.ContractModule), canActivate : [LoginGuard]
  },
  { path: 'login', component: LoginComponent },

  // not found 404
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
