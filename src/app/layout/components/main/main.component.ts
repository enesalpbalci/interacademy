import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }

  isUserLoggedIn:any = null;

  ngOnInit(): void {
    this.isUserLoggedIn = localStorage.getItem('token');
  }

}
