import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFacilityComponent } from './add-facility/add-facility.component';
import { ListFacilityComponent } from './list-facility/list-facility.component';
import { UpdateFacilityComponent } from './update-facility/update-facility.component';
import { ViewFacilityComponent } from './view-facility/view-facility.component';
const routes: Routes = [
  { path: 'add', component: AddFacilityComponent },
  { path: '', component: ListFacilityComponent },
  { path: 'update/:id', component: UpdateFacilityComponent },
  { path: 'get/:id', component: ViewFacilityComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class FacilityRoutingModule {}
