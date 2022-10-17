import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.interface';
import { City } from 'src/app/models/city.interface';
import { Facility } from 'src/app/models/facility.interface';
import { Group } from 'src/app/models/group.interface';
import { DependetDropdownService } from 'src/app/services/dependet-dropdown.service';
import { PaymentDuration } from 'src/app/models/payment-duration.interface';
import { PaymentDurationService } from 'src/app/services/payment-duration.service';
import { ContractService } from 'src/app/services/contract.service';
import { Contract } from 'src/app/models/contract.interface';
import { UserService } from 'src/app/services/user.service';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dependetDropdown: DependetDropdownService,
    private paymentDurationService: PaymentDurationService,
    private contratService: ContractService,
    private userService:UserService,
    private datePipe:DatePipe
  ) {}
  addForm: FormGroup;
  users: User[] = [];
  cities: City[] = [];
  facilities: Facility[] = [];
  groups: Group[] = [];
  paymentDurations: PaymentDuration[] = [];
  selectedDuration: PaymentDuration;
  selCityId: number;
  selFacilityId: number;

  passWord = 'aaaa';
  approvedId: string;
  roleName :string;

  url: string;

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

  // fillPaymentDurations() {
  //   this.paymentDurationService
  //     .getAllPaymentDurations(this.selFacilityId)
  //     .subscribe(
  //       (res) => {
  //         this.paymentDurations = res;
  //       },
  //       (err) => {
  //         console.log(err);
  //       }
  //     );
  // }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group(
      {
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
        birthDay: ['', [Validators.required]],
        bloodGroup: [null, Validators.required],
        scholl: ['aaa', Validators.required],
        height: [222, Validators.required],
        weight: [222, Validators.required],
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
      }
      // {
      //   validators: this.MustMuch('passWord', 'confirmPassword'),
      // }
    );
    console.log(this.addForm);
    this.fillCity();
  }

  MustMuch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.MustMuch) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ MustMuch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

   addStudent() {
    if (true || this.addForm.valid) {
      // await this.setDurationToForm();
      let email = this.addForm.get('email').value
      this.addForm.get('userName').setValue(email)

      let bDay = this.addForm.get('birthDay').value;
      bDay = this.datePipe.transform(bDay,'yyyy-MM-dd')
      this.addForm.get('birthDay').setValue(bDay)

      this.userService
        .addStudent(this.passWord, this.roleName, this.addForm.value)
        .subscribe((res) => {
          alert('Üye Eklendi');
          console.log(res);
        },
        (err)=>{
          alert('Üye eklenirken bir hata oluştu!')
        });
      this.addForm.reset();
      this.router.navigate(['/contracts']);
    }
    console.log(this.addForm.value);
  }

  onFileChanged(e: any) {
    let files = e.target.files;
    if (files[0]) {
      this.readAsByteArray(files[0]);
      this.readAsDataURL(files[0]);
    }
  }

  readAsByteArray(file: any) {
    let reader = new FileReader();
    let fileByteArray: number[] = [];
    reader.readAsArrayBuffer(file);
    reader.onloadend = (evt) => {
      if (evt.target.readyState == FileReader.DONE) {
        this.url = evt.target.result as string;
        let arrayBuffer = evt.target.result as ArrayBuffer;
        let array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < array.length; i++) {
          fileByteArray.push(array[i]);
        }
        this.addForm.controls['image'].setValue(fileByteArray);
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

  get f() {
    return this.addForm.controls;
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  // async setDurationToForm(): Promise<boolean> {
  //   const paymentDurationId = this.addForm.get('paymentDurationId').value;

  //   console.log(paymentDurationId, this.paymentDurations);
  //   const duration: PaymentDuration = this.paymentDurations.find(
  //     (paymentDuration) => {
  //       if (paymentDuration.id == paymentDurationId) {
  //         return paymentDuration;
  //       }
  //     }
  //   );

  //   if (typeof duration !== 'undefined') {
  //     this.addForm.get('duration').setValue(duration.duration);
  //     this.addForm.get('price').setValue(duration.price);
  //   }

  //   return true;
  // }
}
