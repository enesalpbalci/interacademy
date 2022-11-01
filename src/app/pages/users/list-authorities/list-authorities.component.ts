import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.interface';
import { Subject } from 'rxjs';
import { Role } from 'src/app/models/role.interface';
import { RoleService } from 'src/app/services/role.service';
import { DataTablesModule } from 'angular-datatables';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-authorities',
  templateUrl: './list-authorities.component.html',
  styleUrls: ['./list-authorities.component.css'],
  providers: [UserService],
})
export class ListAuthorityComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  users: User[] = [];
  roles: Role[] = [];

  selRoleName: string;

  dtOptions: any = {};
  dtTrigger: Subject<void> = new Subject<void>();

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      language: {
        url: '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Turkish.json',
      },
      dom: 'Bfrtip',
      buttons: [
        // {
        //   text: 'Kullanıcı Ekle',
        //   action: (): void => {
        //     this.router.navigate(['/users/add-authority'])
        //   },
        //   className: "btn btn-info",
        // },
        'pdf',
        'excel',
        'print',
      ],
      responsive: true,
      paging: true,
      searching: true,
      lengthMenu: [5, 15, 25],
      destroy: true,
    };
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
     
    }, 300);
    this.getAllRoles();
    this.getUsersByRole(this.selRoleName);
  }

  getUsersByRole(roleName: string) {
    this.userService.getAllUsersByRole(roleName).subscribe(
      (data) => {
        this.users = data;
        this.dtTrigger.next();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAllRoles() {
    this.roleService.getAllRoles().subscribe(
      (res) => {
        this.roles = res.filter(
          (r) => r.name != 'Student' && r.name != 'Parent'
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSelectedRoleChanged(event: any) {
    this.getUsersByRole(this.selRoleName);
    this.dtTrigger.next(this.dtOptions);
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
