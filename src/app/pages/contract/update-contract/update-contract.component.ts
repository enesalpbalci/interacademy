import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserIdHelper } from 'src/app/helper/user-id.helper';
import { City } from 'src/app/models/city.interface';
import { Contract } from 'src/app/models/contract.interface';
import { Facility } from 'src/app/models/facility.interface';
import { Group } from 'src/app/models/group.interface';
import { PaymentDuration } from 'src/app/models/payment-duration.interface';
import { User } from 'src/app/models/user.interface';
import { ContractService } from 'src/app/services/contract.service';
import { DependetDropdownService } from 'src/app/services/dependet-dropdown.service';
import { PaymentDurationService } from 'src/app/services/payment-duration.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-contract',
  templateUrl: './update-contract.component.html',
  styleUrls: ['./update-contract.component.css'],
})
export class UpdateContractComponent implements OnInit {
  updateForm: FormGroup;

  users: User[] = [];
  userDetails: User | undefined;
  contract: Contract;
  userId: string;
  cities: City[] = [];
  facilities: Facility[] = [];
  groups: Group[] = [];
  paymentDurations: PaymentDuration[] = [];
  selectedDuration: PaymentDuration;
  selCityId: number;
  selFacilityId: number;

  approved: boolean = true;

  constructor(
    private contractService: ContractService,
    private paymentDurationService: PaymentDurationService,
    private dependetDropdown: DependetDropdownService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userId = UserIdHelper();
    console.log(UserIdHelper());
    this.createForm();
    this.loadForm();
  }

  getByContractId() {
    this.activatedRoute.params.subscribe((params) => {
      this.contractService.getContractById(params['id']).subscribe((data) => {
        this.contract = data;
        this.updateForm.get('studentId').setValue(data.student.id);
        this.updateForm.controls['id'].setValue(data.id);
        this.updateForm.controls['name'].setValue(data.student.name);
        this.updateForm.controls['surName'].setValue(data.student.surName);
        this.updateForm.controls['email'].setValue(data.student.email);
        this.updateForm.controls['phoneNumber'].setValue(
          data.student.phoneNumber
        );
        this.updateForm.controls['userId'].setValue(data.userId)

        // let facility = this.facilities.filter(
        //   (e) => e.id == data.paymentDuration.facilityId
        // )[0];
        // this.updateForm.controls['cityId'].setValue(facility.cityId);
        // this.fillPaymentDurations(facility.id);
        // this.updateForm.controls['facilityId'].setValue(
        //   data.paymentDuration.facilityId
        // );
        // this.updateForm.controls['paymentDurationId'].setValue(
        //   data.paymentDurationId
        // );
        // this.updateForm.controls['duration'].setValue(data.duration);
        this.updateForm.controls['start'].setValue(formatDate(data.start.toString(),'dd.MM.yyyy','en'));
        this.updateForm.controls['price'].setValue(data.price);
        setTimeout(() => {
          this.calculatePrice();
        }, 150);
      });
    });
  }

  createForm() {
    this.updateForm = this.formBuilder.group({
      id: [],
      cityId: [''],
      facilityId: [''],
      studentId: ['', Validators.required],
      start: ['', [Validators.required]],
      userId: ['', Validators.required],
      paymentDurationId: [null],
      price: [null, Validators.required],
      approverId: ['0', Validators.required],
      duration: [null, Validators.required],
      name: [],
      surName: [],
      email: [],
      phoneNumber: [],
      approved: [],
    });
  }
  checkValue(event: any) {
    console.log(event);
  }

  updateContract() {
    if (this.updateForm.valid) {
      // await this.setDurationToForm();
      let data: Contract = Object.assign({}, this.updateForm.value);
      this.contractService
        .updateContract(data.id, this.updateForm.value, this.approved)
        .subscribe(
          (res) => {
            alert('Kontrat Güncellendi');
            console.log(res);
          },
          (err) => {
            alert('Kontrat güncellenirken bir hata oluştu!');
          }
        );
      this.updateForm.reset();
      this.router.navigate(['/contracts']);
    }
    console.log(this.updateForm.value);
  }

  fillCity() {
    this.dependetDropdown.getAllCities().subscribe(
      (res) => {
        this.cities = res;
        return res;
      },
      (err) => {
        console.log(err);
        return null;
      }
    );
  }
  fillFacility(cityId: number) {
    this.dependetDropdown.getAllFacilities(cityId).subscribe(
      (res) => {
        this.facilities = res;
        return res;
      },
      (err) => {
        console.log(err);
        return null;
      }
    );
  }
  fillFacilitySelected() {
    this.fillFacility(this.selCityId);
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

  fillPaymentDurations(facilityId: number) {
    this.paymentDurationService.getAllPaymentDurations(facilityId).subscribe(
      (res) => {
        console.log(res);
        this.paymentDurations = res;
        return res;
      },
      (err) => {
        console.log(err);
        return null;
      }
    );
  }
  fillPaymentDurationSelected() {
    this.fillPaymentDurations(this.selFacilityId);
  }

  // getPaymentDurationById(id: number): undefined | PaymentDuration {
  //   // const paymentDuration: PaymentDuration[] = this.paymentDurations.filter(
  //   //   (paymentDuration) => {
  //   //     return paymentDuration.id === id;
  //   //   }
  //   // );
  //   // return paymentDuration[0];
  //}

  calculatePrice() {
    // const contractDuration = parseInt(
    //   this.updateForm.get('duration').value || 0
    // );
    // const paymentDurationId = parseInt(
    //   this.updateForm.get('paymentDurationId').value || 0
    // );

    // if (contractDuration === 0 || paymentDurationId === 0) {
    //   return;
    // }

    // const paymentDuration = this.getPaymentDurationById(paymentDurationId);
    // const paymentCount = contractDuration / paymentDuration.duration;

    // this.updateForm.get('price').setValue(paymentCount * paymentDuration.price);
  }

  get f() {
    return this.updateForm.controls;
  }

  loadForm(){  
    this.dependetDropdown.getAllCities().subscribe(
      (cRes) => {
        this.cities = cRes;
        this.dependetDropdown.getAllFacilities(null).subscribe(
          (fRes) => {
            this.facilities = fRes;
            this.getByContractId();
          },
          (err) => {
            console.log(err);
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
