import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'interacademy';
  token: boolean = false;
  loggedIn() {
    if (localStorage.getItem('token') == null) {
      this.token = false;
    }
    else{
      return this.token = true;
    }
  }

  getMargin(token:any) { (2)
    switch (token) {
      case localStorage.getItem('token'):
        return '0';
      case localStorage.getItem(null):
        return '0';
    }
  }
}
