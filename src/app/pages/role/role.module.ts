import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewRoleComponent } from './view-role/view-role.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { ListRoleComponent } from './list-role/list-role.component';
import { UpdateRoleComponent } from './update-role/update-role.component';
import { RoleRoutingModule } from './role-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables/'



@NgModule({
  declarations: [
    ViewRoleComponent,
    AddRoleComponent,
    ListRoleComponent,
    UpdateRoleComponent,
  ],
  imports: [
    CommonModule,
    RoleRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule
  ]
})
export class RoleModule { }
