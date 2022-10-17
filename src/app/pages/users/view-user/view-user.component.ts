import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  } from '@angular/router';
import { User } from 'src/app/models/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css'],
  providers:[UserService]
})
export class ViewUserComponent implements OnInit {
 
  user: User;

  constructor(private userService:UserService,private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.userService.getUserById(params["id"]).subscribe(data => {
        this.user = data;
      })
    })
  }


  removeUser(id: any) {
    if (confirm('Silmek istediğinize emin misiniz?')) {
      this.userService.removeUser(id).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
  