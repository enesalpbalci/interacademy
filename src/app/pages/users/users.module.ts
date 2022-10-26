import { NgModule } from '@angular/core';
import { AddUserComponent } from './add-user/add-user.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { ListAuthorityComponent } from './list-authorities/list-authorities.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UserRoutingModule } from './users-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { DataTablesModule } from "angular-datatables";
import { AddAuthoritiesComponent } from './add-authorities/add-authorities.component';
import { UpdateAuthoritiesComponent } from './update-authorities/update-authorities.component';
import { DatePipe } from '@angular/common';
import { ListUserComponent } from './list-user/list-user.component';
import { ViewAuthoritiesComponent } from './view-authorities/view-authorities.component';


@NgModule({
  declarations: [
    AddUserComponent,
    ViewUserComponent,
    ListAuthorityComponent,
    ListUserComponent,
    UpdateUserComponent,
    AddAuthoritiesComponent,
    UpdateAuthoritiesComponent,
    ViewAuthoritiesComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    DataTablesModule
  ],
  providers:[
    DatePipe,
  ],
  exports: [],
})
export class UsersModule {}
