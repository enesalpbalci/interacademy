import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PaymentsModule } from './payments/payments.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentDurationModule } from './payment/payment-duration.module';
import { ContractModule } from './contract/contract.module';
import { GroupModule } from './group/group.module';
import { RoleModule } from './role/role.module';
import { UsersModule } from './users/users.module';
import { LayoutModule } from '../layout/layout.module';
import { ProductModule } from './product/product.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    LayoutModule,
    UsersModule,
    RoleModule,
    GroupModule,
    ContractModule,
    PaymentDurationModule,
    ReactiveFormsModule,
    FormsModule,
    PaymentsModule,
    ProductModule
  ]
})
export class PagesModule { }
