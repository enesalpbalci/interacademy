import { Component, OnInit, OnDestroy } from '@angular/core';
import { Role } from 'src/app/models/role.interface';
import { Subject } from 'rxjs';
import { RoleService } from 'src/app/services/role.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.css'],
})
export class ListRoleComponent implements OnInit, OnDestroy {
  roles: Role[] = [];

  dtOptions: any = {};
  dtTrigger: Subject<void> = new Subject<void>();

  constructor(private roleService: RoleService, private router: Router) {}

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
        //   text: 'Rol Ekle',
        //   action: (): void => {
        //     this.router.navigate(['/roles/add']);
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
    this.getAllRoles();
  }
  getAllRoles() {
    this.roleService.getAllRoles().subscribe(
      (data) => {
        this.roles = data.filter(x=>x.name!="Administrator" && x.name !="Student" && x.name!="User" && x.name != "Parent");
        this.dtTrigger.next();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  removeRole(id: any) {
    this.roleService.removeRole(id).subscribe(
      (res) => {
        if (confirm('Rolü silmek istediğinize emin misiniz?'))
          this.getAllRoles();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
