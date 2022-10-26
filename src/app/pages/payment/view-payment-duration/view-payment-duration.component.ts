import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentDuration } from 'src/app/models/payment-duration.interface';
import { PaymentDurationService } from 'src/app/services/payment-duration.service';

@Component({
  selector: 'app-view-payment-duration',
  templateUrl: './view-payment-duration.component.html',
  styleUrls: ['./view-payment-duration.component.css'],
})
export class ViewPaymentDurationComponent implements OnInit {
  paymentDurations: PaymentDuration;

  constructor(
    private paymentDurationService: PaymentDurationService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.paymentDurationService
        .getPaymentDurationById(params['id'])
        .subscribe((data) => {
          this.paymentDurations = data;
        });
    });
  }
  removePaymentDuration(id: any) {
    if (confirm('Silmek istediğinize emin misiniz?')) {
      this.paymentDurationService.removePaymentDuration(id).subscribe(
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
