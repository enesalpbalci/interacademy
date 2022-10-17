import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Role } from 'src/app/models/role.interface';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-view-role',
  templateUrl: './view-role.component.html',
  styleUrls: ['./view-role.component.css']
})
export class ViewRoleComponent implements OnInit {

  role: Role;

  constructor(private roleService:RoleService,private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.roleService.getRoleById(params["id"]).subscribe(data => {
        this.role = data;
      })
    })
  }


  removeRole(id: any) {
    if (confirm('Silmek istediğinize emin misiniz?')) {
      this.roleService.removeRole(id).subscribe(
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
