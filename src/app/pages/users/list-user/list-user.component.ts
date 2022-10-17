import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.interface';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
  providers: [UserService],
})
export class ListUserComponent implements OnInit {
  users: User[] = [];
  error: any;

  selRoleId: string;

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private userService: UserService) {}

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
      destroy:true
    };
    this.getAllUsers();
  }
  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        this.error = error;
        console.log(error);
      }
    );
  }

  removeUser(id: any) {
    if (confirm('Silmek istediğinize emin misiniz?')) {
      this.userService.removeUser(id).subscribe(
        (res) => {
          console.log(res);
          this.getAllUsers();
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
