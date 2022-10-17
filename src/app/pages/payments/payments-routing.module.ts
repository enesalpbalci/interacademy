import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPaymentComponent } from './list-payment/list-payment.component';
import { UpdatePaymentComponent } from './update-payment/update-payment.component';
import { ViewPaymentComponent } from './view-payment/view-payment.component';

const routes: Routes = [
  { path: '', component: ListPaymentComponent },
  { path: 'update/:id', component: UpdatePaymentComponent },
  { path: 'get/:id', component: ViewPaymentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
