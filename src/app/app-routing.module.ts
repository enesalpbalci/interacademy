import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { MainComponent } from './layout/components/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
const routes: Routes = [
  // home
  {path: '', component:MainComponent, canActivate:[LoginGuard], loadChildren:()=>import('./pages/pages.module').then((e)=>e.PagesModule)},
  { path: 'login', component: LoginComponent },

  // not found 404
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
