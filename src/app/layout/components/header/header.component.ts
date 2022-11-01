import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private router:Router, private activatedRoute:ActivatedRoute, private userService:UserService, private authService:AuthService) {}

  user:User

  userInfo(){
    this.userService.getUserById(this.user.name)
  }

  ngOnInit(): void {

  }
  loggedIn(){
    return localStorage.getItem("token")
  }
  onLogOut(){
    localStorage.removeItem("token")
    this.router.navigate(['/login'])
  }
}
