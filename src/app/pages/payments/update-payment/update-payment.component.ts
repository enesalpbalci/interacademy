import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Payment } from 'src/app/models/payment.interface';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-update-payment',
  templateUrl: './update-payment.component.html',
  styleUrls: ['./update-payment.component.css'],
})
export class UpdatePaymentComponent implements OnInit {
  constructor(
    private paymentService: PaymentService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}

  payments: Payment[] = [];

  payment: Payment;

  updateForm: FormGroup;

  file: File;

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      id: [0],
      contractId: [0, Validators.required],
      amount: [null, Validators.required],
      type: ['', Validators.required],
      userId: ['0'],
      note: [''],
      dueDate: ['', Validators.required],
      fileSource: [null],
    });
    this.getPayment();
  }

  getPayment() {
    this.activatedRoute.paramMap.subscribe((params) => {
      let id = params.get('id');
      if (id) {
        this.paymentService.getPaymentClaimById(id).subscribe(
          (res) => {
            this.payment = res;
            this.updateForm.controls['id'].setValue(res.id);
            this.updateForm.controls['contractId'].setValue(res.contractId);
            this.updateForm.controls['amount'].setValue(res.amount);
            this.updateForm.controls['type'].setValue(res.type);
            this.updateForm.controls['dueDate'].setValue(res.dueDate);
            this.updateForm.controls['note'].setValue(res.note);
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }

  updatePayment() {
    if (this.updateForm.valid) {
      let data: Payment = Object.assign({}, this.updateForm.value);
      this.paymentService
        .updatePayment(this.payment.id, data, this.file)
        .subscribe(
          (res) => {
            alert('Ödeme Güncellendi');
            this.updateForm.reset();
            this.router.navigate(['/payments']);
          },
          (err) => {
            alert('Ödeme güncellenirken bir hata oluştu');
          }
        );
    }
  }
  get f() {
    return this.updateForm.controls;
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }
}
