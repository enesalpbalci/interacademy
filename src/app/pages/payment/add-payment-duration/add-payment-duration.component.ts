import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentDurationService } from 'src/app/services/payment-duration.service';
import { DependetDropdownService } from 'src/app/services/dependet-dropdown.service';
import { Facility } from 'src/app/models/facility.interface';
import { City } from 'src/app/models/city.interface';
import { Observable } from 'rxjs';
import { PaymentDuration } from 'src/app/models/payment-duration.interface';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment-duration.component.html',
  styleUrls: ['./add-payment-duration.component.css'],
})
export class AddPaymentDurationComponent implements OnInit {
  durations :PaymentDuration[]=[]

  allCity: City[] = [];
  allFacility: Facility[] = [];

  selCityId: number = 0;

  city: FormGroup;
  addForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private dependetDropdown: DependetDropdownService,
    private paymentDurationService: PaymentDurationService,
    private router: Router
  ) {}

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
  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      id: [0],
      duration: [, Validators.required],
      price: [, Validators.required],
      facilityId: [, Validators.required],
    });
    this.city = this.formBuilder.group({
      cityId: ['', Validators.required],
    });
    this.fillCity();
  }

  addPayment() {
    if (this.addForm.valid) {
      this.paymentDurationService
        .addPaymentDuration(this.addForm.value)
        .subscribe(
          (res) => {
            alert('Ödeme türü eklendi');
            this.addForm.reset();
            this.router.navigate(['/paymentdurations']);
          },
          (err) => {
            alert('Ödeme türü eklenirken bir hata oluştu');
          }
        );
    }
  }

  get f(){
    return this.addForm.controls
  }
}
