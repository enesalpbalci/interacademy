import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentDurationRoutingModule } from './payment-duration-routing.module';
import { AddPaymentDurationComponent } from './add-payment-duration/add-payment-duration.component';
import { UpdatePaymentDurationsComponent } from './update-payment-durations/update-payment-durations.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListPaymentDurationsComponent } from './list-payment-durations/list-payment-durations.component';
import { ViewPaymentDurationComponent } from './view-payment-duration/view-payment-duration.component';
import { DataTablesModule } from "angular-datatables";


@NgModule({
  declarations: [
    AddPaymentDurationComponent,
    UpdatePaymentDurationsComponent,
    ListPaymentDurationsComponent,
    ViewPaymentDurationComponent
  ],
  imports: [
    CommonModule,
    PaymentDurationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule
  ]
})
export class PaymentDurationModule { }
