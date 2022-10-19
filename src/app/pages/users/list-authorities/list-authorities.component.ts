import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.interface';
import { Subject } from 'rxjs';
import { Role } from 'src/app/models/role.interface';
import { RoleService } from 'src/app/services/role.service';
@Component({
  selector: 'app-list-authorities',
  templateUrl: './list-authorities.component.html',
  styleUrls: ['./list-authorities.component.css'],
  providers: [UserService],
})
export class ListAuthorityComponent implements OnInit, OnDestroy {
  users: User[] = [];
  roles: Role[] = [];
  error: any;

  selRoleName: string = "Administrator";

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private userService: UserService,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      language: {
        url: '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Turkish.json',
      },
      dom: 'Bfrtip',
      buttons: ['excel', 'pdf', 'print'],
      responsive: true,
      lengthMenu: [5, 15, 25],
      destroy: true,
    };
    this.getAllRoles();
    this.getUsersByRole(this.selRoleName)
  }


  getUsersByRole(roleName: string) {
    this.userService.getAllUsersByRole(roleName).subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        this.error = error;
        console.log(error);
      }
    );
  }

  getAllRoles() {
    this.roleService.getAllRoles().subscribe(
      (res) => {
        this.roles = res;
        this.dtTrigger.next(null);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSelectedRoleChanged(event: any) {
    this.getUsersByRole(this.selRoleName)
  }

  removeUser(id: any) {
    if (confirm('Silmek istediğinize emin misiniz?')) {
      this.userService.removeUser(id).subscribe(
        (res) => {
          console.log(res);
          this.getUsersByRole(this.selRoleName);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
