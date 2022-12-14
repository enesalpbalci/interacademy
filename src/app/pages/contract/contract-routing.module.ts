import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddContractComponent } from './add-contract/add-contract.component';
import { ListContractComponent } from './list-contract/list-contract.component';
import { UpdateContractComponent } from './update-contract/update-contract.component';
import { UserContractsComponent } from './user-contracts/user-contracts.component';
import { ViewContractComponent } from './view-contract/view-contract.component';

const routes: Routes = [
  { path: 'add/:id', component: AddContractComponent },
  { path: '', component: ListContractComponent },
  { path: 'update/:id', component: UpdateContractComponent },
  { path: 'get/:id', component: ViewContractComponent },
  { path: 'user-contracts/:id', component: UserContractsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractRoutingModule { }
