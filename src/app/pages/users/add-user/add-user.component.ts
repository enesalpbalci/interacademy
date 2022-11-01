import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  FormBuilder,
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
import { UserService } from 'src/app/services/user.service';

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
    private userService: UserService
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
  roleName: string;

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
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
          ],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ],
        ],
        phoneNumber: [
          '',
          [
            Validators.required,
            Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
            Validators.minLength(10),
            Validators.maxLength(10),
          ],
        ],
        surName: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
          ],
        ],
        idNumber: [
          '',
          [
            Validators.required,
            Validators.maxLength(11),
            Validators.minLength(11),
            Validators.pattern(/\-?\d*\.?\d{1,2}/),
          ],
        ],
        gender: [false, Validators.required],
        birthDay: ['', [Validators.required]],
        bloodGroup: [null, Validators.required],
        school: ['', Validators.required],
        height: [null, Validators.required],
        weight: [null, Validators.required],
        address: [
          '',
          [
            Validators.maxLength(256),
            Validators.required,
            Validators.minLength(16),
          ],
        ],
        emergencyPerson: ['', Validators.required],
        diseases: [''],
        allergies: [''],
        foodRestrictions: [''],
        mother: this.formBuilder.group({
          userName: [''],
          email: [
            '',
            [
              Validators.email,
              Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
            ],
          ],
          phoneNumber: [
            '',
            [
              Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
              Validators.minLength(10),
              Validators.maxLength(10),
            ],
          ],
          name: [''],
          surName: [''],
          gender: [true],
          profession: [''],
          address: [''],
        }),
        father: this.formBuilder.group({
          userName: [''],
          email: [
            '',
            [
              Validators.email,
              Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
            ],
          ],
          phoneNumber: [
            '',
            [
              Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
              Validators.minLength(10),
              Validators.maxLength(10),
            ],
          ],
          name: [''],
          surName: [''],
          gender: [true],
          profession: [''],
          address: [''],
        }),
        cityId: [0],
        facilityId: [0],
        groupId: [0],
      }
    );

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
    if (this.addForm.valid) {
      let email = this.addForm.get('email').value;
      this.addForm.get('userName').setValue(email);

      let motherEmail = this.addForm.get('mother.email').value;
      this.addForm.get('mother.userName').setValue(motherEmail);

      let fatherEmail = this.addForm.get('father.email').value;
      this.addForm.get('father.userName').setValue(fatherEmail);

      this.userService
        .addStudent(this.passWord, this.roleName, this.addForm.value)
        .subscribe(
          (res) => {
            alert('Üye Eklendi');
            console.log(res);
          },
          (err) => {
            alert('Üye eklenirken bir hata oluştu!');
          }
        );
      this.addForm.reset();
      this.router.navigate(['users/students']);
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
}
