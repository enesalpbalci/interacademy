import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainComponent } from './components/main/main.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    MainComponent,
  ],
  imports: [CommonModule,
  RouterModule],
  exports: [
    RouterModule,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    MainComponent,
  ],
})
export class LayoutModule {}
