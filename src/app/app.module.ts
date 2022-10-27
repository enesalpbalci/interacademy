import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// matmodule--->
import { LayoutModule } from './layout/layout.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UsersModule } from './pages/users/users.module';
import { LoginComponent } from './pages/login/login.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { LoginGuard } from './guards/login.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
@NgModule({
  declarations: [AppComponent, NotFoundComponent, LoginComponent, DashboardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    HttpClientModule,
  ],
  providers: [
    { provide: 'apiUrl', useValue: 'http://185.95.164.188/api' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    LoginGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
