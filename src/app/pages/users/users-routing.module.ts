import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAuthoritiesComponent } from './add-authorities/add-authorities.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ListAuthorityComponent } from './list-authorities/list-authorities.component';
import { ListUserComponent } from './list-user/list-user.component';
import { UpdateAuthoritiesComponent } from './update-authorities/update-authorities.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ViewUserComponent } from './view-user/view-user.component';

const routes: Routes = [
  { path: 'add-authority', component: AddAuthoritiesComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'students', component: ListUserComponent },
  { path: 'authorities', component: ListAuthorityComponent},
  { path: 'update/:id', component: UpdateAuthoritiesComponent },
  // { path: 'authority/update/:id', component: UpdateAuthoritiesComponent },
  { path: 'get/:id', component: ViewUserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
