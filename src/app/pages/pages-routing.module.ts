import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
    component: DashboardComponent,
  },

  // user
  {
    path: 'users',
    loadChildren: () =>
      import('./../pages/users/users.module').then((e) => e.UsersModule),
  },
  //role
  {
    path: 'roles',
    loadChildren: () =>
      import('./../pages/role/role.module').then((e) => e.RoleModule),
  },
  //facility
  {
    path: 'facilities',
    loadChildren: () =>
      import('./../pages/facility/facility.module').then(
        (e) => e.FacilityModule
      ),
  },
  //group
  {
    path: 'groups',
    loadChildren: () =>
      import('./../pages/group/group.module').then((e) => e.GroupModule),
  },
  //payment
  {
    path: 'payments',
    loadChildren: () =>
      import('./../pages/payments/payments.module').then(
        (e) => e.PaymentsModule
      ),
  },
  //payment-durations
  {
    path: 'paymentdurations',
    loadChildren: () =>
      import('./../pages/payment/payment-duration.module').then(
        (e) => e.PaymentDurationModule
      ),
  },
  //contract
  {
    path: 'contracts',
    loadChildren: () =>
      import('./../pages/contract/contract.module').then(
        (e) => e.ContractModule
      ),
  },
  //products
  {
    path: 'products',
    loadChildren: () =>
      import('./../pages/product/product.module').then(
        (e) => e.ProductModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
