import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRoleComponent } from './add-role/add-role.component';
import { ListRoleComponent } from './list-role/list-role.component';
import { UpdateRoleComponent } from './update-role/update-role.component';
import { ViewRoleComponent } from './view-role/view-role.component';
const routes: Routes = [
  { path: 'add', component: AddRoleComponent },
  { path: '', component: ListRoleComponent },
  { path: 'update/:id', component: UpdateRoleComponent },
  { path: 'get/:id', component: ViewRoleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
