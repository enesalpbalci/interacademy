import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/app/models/city.interface';
import { Facility } from 'src/app/models/facility.interface';
import { PaymentDuration } from 'src/app/models/payment-duration.interface';
import { CityService } from 'src/app/services/city.service';
import { FacilityService } from 'src/app/services/facility.service';
import { PaymentDurationService } from 'src/app/services/payment-duration.service';
import { Observable } from 'rxjs';
import { DependetDropdownService } from 'src/app/services/dependet-dropdown.service';
@Component({
  selector: 'app-update-payment-durations',
  templateUrl: './update-payment-durations.component.html',
  styleUrls: ['./update-payment-durations.component.css'],
})
export class UpdatePaymentDurationsComponent implements OnInit {
  constructor(
    private facilityService: FacilityService,
    private paymentDurationService: PaymentDurationService,
    private activatedRoute: ActivatedRoute,
    private cityService: CityService,
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
    // this.getPaymentDuration();
    this.fillCity();
  }

  // private getPaymentDuration() {
  //   this.activatedRoute.paramMap.subscribe((params) => {
  //     let id = params.get('id');
  //     if (id) {
  //       this.paymentDurationId = id;
  //       this.paymentDurationService.getPaymentDurationById(id).subscribe(
  //         (res) => {
  //           this.updateForm.controls['id'].setValue(res.id);
  //           this.updateForm.controls['duration'].setValue(res.duration);
  //           this.updateForm.controls['price'].setValue(res.price);
  //           this.updateForm.controls['facilityId'].setValue(res.facilityId);
  //         },
  //         (error) => {
  //           console.log(error);
  //         }
  //       );
  //     }
  //   });
  // }

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
