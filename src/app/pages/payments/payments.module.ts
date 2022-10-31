import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import { ListPaymentComponent } from './list-payment/list-payment.component';
import { ViewPaymentComponent } from './view-payment/view-payment.component';
import { UpdatePaymentComponent } from './update-payment/update-payment.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListPaymentComponent,
    ViewPaymentComponent,
    UpdatePaymentComponent,
  ],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
  ],
})
export class PaymentsModule {}
