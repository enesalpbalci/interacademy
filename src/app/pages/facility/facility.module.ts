import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddFacilityComponent } from './add-facility/add-facility.component';
import { ListFacilityComponent } from './list-facility/list-facility.component';
import { ViewFacilityComponent } from './view-facility/view-facility.component';
import { UpdateFacilityComponent } from './update-facility/update-facility.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FacilityRoutingModule } from './facility-routing.module';
import { DataTablesModule } from "angular-datatables";


@NgModule({
  declarations: [
    AddFacilityComponent,
    ListFacilityComponent,
    ViewFacilityComponent,
    UpdateFacilityComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FacilityRoutingModule,
    DataTablesModule
  ]
})
export class FacilityModule { }
