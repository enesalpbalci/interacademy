import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAuthoritiesComponent } from './add-authorities/add-authorities.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ViewUserComponent } from './view-user/view-user.component';

const routes: Routes = [
  { path: 'add-authority', component: AddAuthoritiesComponent },
  { path: 'add', component: AddUserComponent },
  { path: '', component: ListUserComponent },
  { path: 'update/:id', component: UpdateUserComponent },
  { path: 'get/:id', component: ViewUserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
