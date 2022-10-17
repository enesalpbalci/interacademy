import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddGroupComponent } from './add-group/add-group.component';
import { ListGroupComponent } from './list-group/list-group.component';
import { UpdateGroupComponent } from './update-group/update-group.component';
import { ViewGroupComponent } from './view-group/view-group.component';

const routes: Routes = [
  { path: 'add', component: AddGroupComponent },
  { path: '', component: ListGroupComponent },
  { path: 'update/:id', component: UpdateGroupComponent },
  { path: 'get/:id', component: ViewGroupComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRoutingModule { }
