import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractRoutingModule } from './contract-routing.module';
import { AddContractComponent } from './add-contract/add-contract.component';
import { UpdateContractComponent } from './update-contract/update-contract.component';
import { ViewContractComponent } from './view-contract/view-contract.component';
import { ListContractComponent } from './list-contract/list-contract.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import localeTr from '@angular/common/locales/tr';
import { registerLocaleData } from '@angular/common';
import { DataTablesModule } from "angular-datatables";

registerLocaleData(localeTr, 'tr');

@NgModule({
  declarations: [
    AddContractComponent,
    UpdateContractComponent,
    ViewContractComponent,
    ListContractComponent,
  ],
  imports: [
    CommonModule,
    ContractRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    FormsModule,
    DataTablesModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'tr' }],
})
export class ContractModule {}
