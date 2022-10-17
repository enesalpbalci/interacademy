import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRoutingModule } from './group-routing.module';
import { UpdateGroupComponent } from './update-group/update-group.component';
import { ViewGroupComponent } from './view-group/view-group.component';
import { ListGroupComponent } from './list-group/list-group.component';
import { AddGroupComponent } from './add-group/add-group.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from "angular-datatables";


@NgModule({
  declarations: [
    UpdateGroupComponent,
    ViewGroupComponent,
    ListGroupComponent,
    AddGroupComponent
  ],
  imports: [
    CommonModule,
    GroupRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule
  ]
})
export class GroupModule { }
