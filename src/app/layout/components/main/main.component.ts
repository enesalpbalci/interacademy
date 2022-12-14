import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor(private router:Router) {}
  ngOnInit(): void {
    document.querySelector('body').classList.add('nav-md');
    document.querySelector('body').classList.remove('login');
  }
  loggedIn() {
    return localStorage.getItem('token');
  }
}
