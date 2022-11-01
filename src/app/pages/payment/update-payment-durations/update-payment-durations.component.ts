import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from 'src/app/models/city.interface';
import { Facility } from 'src/app/models/facility.interface';
import { PaymentDuration } from 'src/app/models/payment-duration.interface';
import { PaymentDurationService } from 'src/app/services/payment-duration.service';
import { DependetDropdownService } from 'src/app/services/dependet-dropdown.service';
@Component({
  selector: 'app-update-payment-durations',
  templateUrl: './update-payment-durations.component.html',
  styleUrls: ['./update-payment-durations.component.css'],
})
export class UpdatePaymentDurationsComponent implements OnInit {
  constructor(
    private paymentDurationService: PaymentDurationService,
    private formBuilder: FormBuilder,
    private dependetDropdown: DependetDropdownService,
    private router: Router
  ) {}

  durations: PaymentDuration[] = [];
  allCity: City[] = [];
  allFacility: Facility[];

  selCityId: number = 0;
  paymentDurationId: string;

  city: FormGroup;
  updateForm: FormGroup;

  fillCity() {
    this.dependetDropdown.getAllCities().subscribe(
      (res) => {
        this.allCity = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  fillFacility() {
    this.dependetDropdown.getAllFacilities(this.selCityId).subscribe(
      (res) => {
        this.allFacility = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  disabled: boolean = true;

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      id: [0],
      duration: [0, Validators.required],
      price: [0, Validators.required],
      facilityId: [0, Validators.required],
      cityId:[]
    });
    this.fillCity();
  }

  updatePaymentDuration() {
    if (this.updateForm.valid) {
      let data: PaymentDuration = Object.assign({}, this.updateForm.value);
      this.paymentDurationService
        .updatePaymentDuration(this.paymentDurationId, data)
        .subscribe(
          (res) => {
            alert('Ödeme Türü Güncellendi');
            this.updateForm.reset();
            this.router.navigate(['/paymentdurations']);
          },
          (err) => {
            alert('Ödeme türü güncellenirken bir hata oluştu');
          }
        );
    }
  }
  get f() {
    return this.updateForm.controls;
  }
}
