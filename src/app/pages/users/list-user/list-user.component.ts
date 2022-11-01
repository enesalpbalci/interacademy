import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Role } from 'src/app/models/role.interface';
import { Subject } from 'rxjs';
import { User } from 'src/app/models/user.interface';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Payment } from 'src/app/models/payment.interface';
import { PaymentService } from 'src/app/services/payment.service';
import { Group } from 'src/app/models/group.interface';
import { Facility } from 'src/app/models/facility.interface';
import { City } from 'src/app/models/city.interface';
import { DependetDropdownService } from 'src/app/services/dependet-dropdown.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
})
export class ListUserComponent implements OnInit, OnDestroy {
  users: User[] = [];
  roles: Role[] = [];
  payments: Payment[] = [];

  allCities: City[] = [];
  allFacilities: Facility[] = [];
  allGroups: Group[] = [];

  selCityId: number = 0;
  selFacilityId: number;
  selGroupId: number;

  selRoleName: string = 'Student';

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private router: Router,
    private dependetDropdown: DependetDropdownService
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
        //   text: 'Öğrenci Ekle',
        //   action: (): void => {
        //     this.router.navigate(['/users/add-user']);
        //   },
        //   className: 'btn btn-info',
        // },
        'excel',
        'pdf',
        'print',
      ],
      responsive: true,
      lengthMenu: [5, 15, 25],
      destroy: true,
    };

    this.fillCity();
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

  fillCity() {
    this.dependetDropdown.getAllCities().subscribe(
      (res) => {
        this.allCities = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  fillFacility() {
    this.dependetDropdown.getAllFacilities(this.selCityId).subscribe(
      (res) => {
        this.allFacilities = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  fillGroup() {
    this.dependetDropdown
      .getAllGroups(this.selFacilityId, this.selCityId)
      .subscribe(
        (res) => {
          this.allGroups = res;
        },
        (err) => {
          console.log(err);
        }
      );
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

  showTable: boolean = false;
  toggleShowTable(): void {
    this.showTable = !this.showTable;
    this.getUsersByRole(this.selRoleName);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
