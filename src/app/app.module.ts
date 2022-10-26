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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { RoleModule } from './pages/role/role.module';
import { GroupModule } from './pages/group/group.module';
import { PaymentDurationModule } from './pages/payment/payment-duration.module';
import { ContractModule } from './pages/contract/contract.module';
import { PaymentsModule } from './pages/payments/payments.module';
import { LoginGuard } from './guards/login.guard';
@NgModule({
  declarations: [AppComponent, NotFoundComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    UsersModule,
    RoleModule,
    GroupModule,
    ContractModule,
    PaymentDurationModule,
    ReactiveFormsModule,
    FormsModule,
    PaymentsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  providers: [
    { provide: 'apiUrl', useValue: 'http://185.95.164.188/api' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    LoginGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
