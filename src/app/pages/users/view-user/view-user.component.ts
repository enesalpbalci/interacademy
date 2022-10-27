import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Payment } from 'src/app/models/payment.interface';
import { User } from 'src/app/models/user.interface';
import { PaymentService } from 'src/app/services/payment.service';
import { UserService } from 'src/app/services/user.service';
import { PaymentsModule } from '../../payments/payments.module';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css'],
  providers: [UserService],
})
export class ViewUserComponent implements OnInit {
  user: User;
  payments: Payment;
  allPayments:Payment[]=[]

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private paymentService: PaymentService
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
      destroy:true
    };
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
