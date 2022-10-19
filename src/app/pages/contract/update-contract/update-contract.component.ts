import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { City } from 'src/app/models/city.interface';
import { Contract } from 'src/app/models/contract.interface';
import { Facility } from 'src/app/models/facility.interface';
import { Group } from 'src/app/models/group.interface';
import { PaymentDuration } from 'src/app/models/payment-duration.interface';
import { User } from 'src/app/models/user.interface';
import { ContractService } from 'src/app/services/contract.service';
import { DependetDropdownService } from 'src/app/services/dependet-dropdown.service';
import { PaymentDurationService } from 'src/app/services/payment-duration.service';

@Component({
  selector: 'app-update-contract',
  templateUrl: './update-contract.component.html',
  styleUrls: ['./update-contract.component.css'],
})
export class UpdateContractComponent implements OnInit {
  updateForm: FormGroup;
  users: User[] = [];
  cities: City[] = [];
  facilities: Facility[] = [];
  groups: Group[] = [];
  paymentDurations: PaymentDuration[] = [];
  selectedDuration: PaymentDuration;
  selCityId: number;
  selFacilityId: number;
  url: string;
  contractId: string;

  passWord = 'aaaa';
  approvedId: string;
  constructor(
    private dependetDropdown: DependetDropdownService,
    private paymentDurationService: PaymentDurationService,
    private contractService: ContractService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      id: [''],
      userId: ['0'],
      studentId: ['0'],
      start: ['2022-10-05T17:34:03.594Z', Validators.required],
      end: ['2022-11-05T17:34:03.594Z'],
      paymentDurationId: [0],
      duration: [0],
      price: [0],
      approverId: [''],
      student: this.formBuilder.group({
        id: [''],
        image: [''],
        userName: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
          ],
        ],
        name: [
          'aaa',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
          ],
        ],
        email: [
          'aaaa@asd.ca',
          [
            Validators.required,
            Validators.email,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ],
        ],
        phoneNumber: [
          '22222222222',
          [
            Validators.required,
            Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
            Validators.minLength(10),
            Validators.maxLength(10),
          ],
        ],
        surName: [
          'ss',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
          ],
        ],
        idNumber: [
          '22222222222',
          [
            Validators.required,
            Validators.maxLength(11),
            Validators.minLength(11),
            Validators.pattern(/\-?\d*\.?\d{1,2}/),
          ],
        ],
        gender: [true, Validators.required],
        birthDay: ['2022-10-05T17:34:03.594Z', [Validators.required]],
        bloodGroup: [null, Validators.required],
        scholl: ['aaa', Validators.required],
        height: [222, Validators.required],
        weight: [222, Validators.required],
        groupId: [0],
        cityId: [],
        facilityId: [],
        duration: [0, Validators.required],
        address: [
          'aaaaaaaaaaaaaaaaaaaaaa',
          [
            Validators.maxLength(256),
            Validators.required,
            Validators.minLength(16),
          ],
        ],
        emergencyPerson: ['asdas', Validators.required],
        diseases: [''],
        allergies: [''],
        foodRestrictions: [''],
        mother: this.formBuilder.group({
          userName: ['mother1@test.com'],
          email: ['mother1@test.com'],
          phoneNumber: ['1234567890'],
          name: ['Mother1'],
          surName: ['MotherSurName'],
          gender: false,
          profession: ['Anne meslek'],
          address: ['Anne adres'],
        }),
        father: this.formBuilder.group({
          userName: ['father@test.com'],
          email: ['father1@test.com'],
          phoneNumber: ['1234567890'],
          name: ['Father1'],
          surName: ['FatherSurName'],
          gender: true,
          profession: ['Baba meslek'],
          address: ['Baba adres'],
        }),
      }),
    });
    this.activatedRoute.paramMap.subscribe((params) => {
      let id = params.get('id');
      if (id) {
        this.contractId = id;
        this.contractService.getContractById(id).subscribe(
          (res) => {
            this.updateForm.controls['id'].setValue(res.id);
            this.updateForm.controls['duration'].setValue(res.duration);
            this.updateForm.controls['price'].setValue(res.price);
            this.updateForm.controls['start'].setValue(res.start);
            this.updateForm.controls['end'].setValue(res.end);
            this.updateForm.controls['price'].setValue(res.price);
            this.updateForm.controls['studentId'].setValue(res.studentId);
            this.updateForm.controls['paymentDurationId'].setValue(
              res.paymentDurationId
            );
            this.updateForm.controls['approverId'].setValue(res.approverId);
            this.updateForm.controls['userId'].setValue(res.userId);
            this.updateForm.controls['user'].setValue(res.user);
            this.updateForm.controls['student'].setValue(res.student);
            this.updateForm.controls['paymentDuration'].setValue(res.paymentDuration);
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
    this.fillCity();
  }

  get f() {
    return this.updateForm.controls;
  }

  updateContract() {
    if (true || this.updateForm.valid) {
      let data: Contract = Object.assign({}, this.updateForm.value);
      this.contractService
        .updateContract(this.contractId, data)
        .subscribe(
          (res) => {
            alert('Kontrat Güncellendi');
            this.updateForm.reset();
            this.router.navigate(['/contracts']);
          },
          (err) => {
            alert('Kontrat güncellenirken bir hata oluştu');
          }
        );
    }
  }

  onFileChanged(e: any) {
    let files = e.target.files;
    if (files[0]) {
      this.readAsByteArray(files[0]);
      this.readAsDataURL(files[0]);
    }
  }

  readAsByteArray(file: any) {
    var reader = new FileReader();
    var fileByteArray: number[] = [];
    reader.readAsArrayBuffer(file);
    reader.onloadend = (evt) => {
      if (evt.target.readyState == FileReader.DONE) {
        this.url = evt.target.result as string;
        let arrayBuffer = evt.target.result as ArrayBuffer;
        let array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < array.length; i++) {
          fileByteArray.push(array[i]);
        }
        this.updateForm.controls['student.image'].setValue(fileByteArray);
      }
    };
  }

  readAsDataURL(file: any) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (event: any) => {
      this.url = event.target.result;
    };
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

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  async setDurationToForm(): Promise<boolean> {
    const paymentDurationId = this.updateForm.get('paymentDurationId').value;

    console.log(paymentDurationId, this.paymentDurations);
    const duration: PaymentDuration = this.paymentDurations.find(
      (paymentDuration) => {
        if (paymentDuration.id == paymentDurationId) {
          return paymentDuration;
        }
      }
    );

    if (typeof duration !== 'undefined') {
      this.updateForm.get('duration').setValue(duration.duration);
      this.updateForm.get('price').setValue(duration.price);
    }

    return true;
  }
}
