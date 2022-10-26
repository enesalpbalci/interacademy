import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserIdHelper } from 'src/app/helper/user-id.helper';
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
import { UsersModule } from '../../users/users.module';

@Component({
  selector: 'app-add-contract',
  templateUrl: './add-contract.component.html',
  styleUrls: ['./add-contract.component.css'],
})
export class AddContractComponent implements OnInit {
  addForm: FormGroup;
  users: User[] = [];
  userDetails: User | undefined;
  userId: string;
  cities: City[] = [];
  facilities: Facility[] = [];
  groups: Group[] = [];
  paymentDurations: PaymentDuration[] = [];
  selectedDuration: PaymentDuration;
  selCityId: number;
  selFacilityId: number;

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
    console.log(UserIdHelper())
    this.getByContractId();
    this.fillCity();
    this.createForm();
  }

  getByContractId() {
    // this.activatedRoute.paramMap.subscribe((params) => {
    //   let id = params.get('id');
    //   let name = params.get('name');
    //   let surName = params.get('surName');
    //   let idNubmer = params.get('idNumber');
    //   let phoneNumber = params.get('phoneNumber');

    //   if (id) {
    //     this.userId = id;
    //     this.userId = name
    //     this.userService.getUserById(id).subscribe(
    //       (res) => {
    //         this.addForm.controls['studentId'].setValue(id);
    //         this.addForm.controls['name'].setValue(name);
    //         this.addForm.controls['userName'].setValue(surName);
    //         this.addForm.controls['idNumber'].setValue(idNubmer);
    //         this.addForm.controls['phoneNumber'].setValue(phoneNumber);
    //       },
    //       (error) => {
    //         console.log(error);
    //       }
    //     );
    //   }
    // });
    this.activatedRoute.params.subscribe((params) => {
      this.userService.getUserById(params['id']).subscribe((data) => {
        this.userDetails = data;
        this.addForm.get('studentId').setValue(data.id);
      });
    });
  }

  createForm() {
    this.addForm = this.formBuilder.group({
      cityId: [''],
      facilityId: [''],
      groupId: [''],
      studentId: ['', Validators.required],
      start: ['', [Validators.required]],
      userId: ["0", Validators.required],
      paymentDurationId: [null],
      price: [null, Validators.required],
      approverId: ['0', Validators.required],
      duration: [null, Validators.required],
    });
  }

  addContract() {
    if (true || this.addForm.valid) {
      // await this.setDurationToForm();
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
          console.log(res);
          this.paymentDurations = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getPaymentDurationById(id: number): undefined | PaymentDuration {
    const paymentDuration: PaymentDuration[] = this.paymentDurations.filter(
      (paymentDuration) => {
        return paymentDuration.id === id;
      }
    );

    return paymentDuration[0];
  }

  calculatePrice() {
    const contractDuration = parseInt(this.addForm.get('duration').value || 0);
    const paymentDurationId = parseInt(
      this.addForm.get('paymentDurationId').value || 0
    );

    if (contractDuration === 0 || paymentDurationId === 0) {
      return;
    }

    const paymentDuration = this.getPaymentDurationById(paymentDurationId);
    const paymentCount = contractDuration / paymentDuration.duration;

    this.addForm.get('price').setValue(paymentCount * paymentDuration.price);
  }

  // async setDurationToForm(): Promise<boolean> {
  //   const paymentDurationId: number =
  //     this.addForm.get('paymentDurationId').value;
  //   console.log(paymentDurationId, this.paymentDurations);
  //   const duration: PaymentDuration = this.paymentDurations.find(
  //     (paymentDuration) => {
  //       if (paymentDuration.id == paymentDurationId) {
  //         return paymentDuration;
  //       }
  //     }
  //   );
  //   if (typeof duration !== 'undefined') {
  //     this.checkDuration(duration);
  //     this.checkPrice(duration);
  //   }
  //   return true;
  // }

  // checkPrice(duration: PaymentDuration) {
  //   this.addForm
  //     .get('price')
  //     .setValue(this.checkDuration(duration) * duration.price);
  // }

  // checkDuration(duration: PaymentDuration): any {
  //   this.addForm
  //     .get('duration')
  //     .setValue(+this.addForm.get('duration').value / duration.duration);
  // }

  get f() {
    return this.addForm.controls;
  }
}
