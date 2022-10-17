import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPaymentDurationComponent } from './add-payment-duration/add-payment-duration.component';
import { ListPaymentDurationsComponent } from './list-payment-durations/list-payment-durations.component';
import { UpdatePaymentDurationsComponent } from './update-payment-durations/update-payment-durations.component';
import { ViewPaymentDurationComponent } from './view-payment-duration/view-payment-duration.component';

const routes: Routes = [
  { path: 'add', component: AddPaymentDurationComponent },
  { path: '', component: ListPaymentDurationsComponent },
  { path: 'update/:id', component: UpdatePaymentDurationsComponent },
  { path: 'get/:id', component: ViewPaymentDurationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentDurationRoutingModule {}
