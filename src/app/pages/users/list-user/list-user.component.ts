import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Role } from 'src/app/models/role.interface';
import { Subject } from 'rxjs';
import { User } from 'src/app/models/user.interface';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Payment } from 'src/app/models/payment.interface';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
})
export class ListUserComponent implements OnInit, OnDestroy {
  users: User[] = [];
  roles: Role[] = [];
  payments: Payment[] = [];

  selRoleName: string = 'Student';

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private router: Router
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
        {
          text: 'Öğrenci Ekle',
          action: (): void => {
            this.router.navigate(['/users/add-user']);
          },
          className: 'btn btn-info',
        },
        'excel',
        'pdf',
        'print',
      ],
      responsive: true,
      lengthMenu: [5, 15, 25],
      destroy: true,
    };

    this.getAllRoles();
    this.getUsersByRole(this.selRoleName);
  }

  getUsersByRole(roleName: string) {
    this.userService.getAllUsersByRole(roleName).subscribe(
      (data) => {
        this.users = data;
        this.dtTrigger.next(null);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAllRoles() {
    this.roleService.getAllRoles().subscribe(
      (res) => {
        this.roles = res.filter((x) => x.name == 'Student');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSelectedRoleChanged(event: any) {
    this.getUsersByRole(this.selRoleName);
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
