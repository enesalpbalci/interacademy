import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Payment } from 'src/app/models/payment.interface';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-view-payment',
  templateUrl: './view-payment.component.html',
  styleUrls: ['./view-payment.component.css']
})
export class ViewPaymentComponent implements OnInit {

  payments: Payment


  constructor(private activatedRoute:ActivatedRoute, private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.paymentService.getPaymentClaimById(params['id']).subscribe((data) => {
        this.payments = data;
      });
    });
  }

}
