import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/app/models/city.interface';
import { Facility } from 'src/app/models/facility.interface';
import { Group } from 'src/app/models/group.interface';
import { PaymentDuration } from 'src/app/models/payment-duration.interface';
import { User } from 'src/app/models/user.interface';
import { ContractService } from 'src/app/services/contract.service';
import { DependetDropdownService } from 'src/app/services/dependet-dropdown.service';
import { PaymentDurationService } from 'src/app/services/payment-duration.service';
import { UserService } from 'src/app/services/user.service';
import { duration } from 'src/assets/vendors/moment/moment';

@Component({
  selector: 'app-add-contract',
  templateUrl: './add-contract.component.html',
  styleUrls: ['./add-contract.component.css'],
})
export class AddContractComponent implements OnInit {
  addForm: FormGroup;
  users: User[] = [];
  cities: City[] = [];
  facilities: Facility[] = [];
  groups: Group[] = [];
  paymentDurations: PaymentDuration[] = [];
  selectedDuration: PaymentDuration;
  selCityId: number;
  selFacilityId: number;
  approverId: string;

  constructor(
    private contractService: ContractService,
    private paymentDurationService: PaymentDurationService,
    private dependetDropdown: DependetDropdownService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      cityId: [''],
      facilityId: [''],
      groupId: [''],
      studentId: ['', Validators.required],
      start: ['', [Validators.required]],
      paymentDurationId: ['', Validators.required],
      userId: [, Validators.required],
      price: [null, Validators.required],
      approverId: ['', Validators.required],
      duration: [null, Validators.required],
    });
    this.fillCity();
  }

  async addContract() {
    if (true || this.addForm.valid) {
      
      await this.setDurationToForm();
      this.contractService.addContract(this.addForm.value).subscribe(
        (res) => {
          alert('Kontrat Eklendi');
          console.log(res);
        },
        (err) => {
          alert('Kontrat eklenirken bir hata oluştu!');
        }
      );
      this.addForm.reset();
      this.router.navigate(['/contracts']);
    }
    console.log(this.addForm.value);
  }

  fillCity() {
    this.dependetDropdown.getAllCities().subscribe(
      (res) => {
        this.cities = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  fillFacility() {
    this.dependetDropdown.getAllFacilities(this.selCityId).subscribe(
      (res) => {
        this.facilities = res;
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
          this.groups = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  fillPaymentDurations() {
    this.paymentDurationService
      .getAllPaymentDurations(this.selFacilityId)
      .subscribe(
        (res) => {
          this.paymentDurations = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  async setDurationToForm(): Promise<boolean> {
    const paymentDurationId = this.addForm.get('paymentDurationId').value;
    console.log(paymentDurationId, this.paymentDurations);
    const duration: PaymentDuration = this.paymentDurations.find(
      (paymentDuration) => {
        if (paymentDuration.id == paymentDurationId) {
          return paymentDuration;
        }
      }
    );
    if (typeof duration !== 'undefined') {
      this.addForm.get('duration').setValue(+duration.duration);
      this.addForm.get('price').setValue(+duration.price);
    }
    return true;
  }
  get f() {
    return this.addForm.controls;
  }
}
