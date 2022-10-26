import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Role } from 'src/app/models/role.interface';
import { User } from 'src/app/models/user.interface';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-authorities',
  templateUrl: './view-authorities.component.html',
  styleUrls: ['./view-authorities.component.css'],
})
export class ViewAuthoritiesComponent implements OnInit {
  user: User;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.authorityDetails();
  }

  authorityDetails() {
    this.activatedRoute.params.subscribe((params) => {
      this.userService.getUserById(params['id']).subscribe((data) => {
        this.user = data;
      });
    });
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
