import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/app/models/city.interface';
import { Facility } from 'src/app/models/facility.interface';
import { Group } from 'src/app/models/group.interface';
import { User } from 'src/app/models/user.interface';
import { DependetDropdownService } from 'src/app/services/dependet-dropdown.service';
import { UserService } from 'src/app/services/user.service';
import { FacilityModule } from '../../facility/facility.module';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private dependetDropDownService: DependetDropdownService
  ) {}

  url: string;

  cities: City[] = [];
  facilities: Facility[] = [];
  groups: Group[] = [];
  selectedUserId: string;
  user: User;

  selCityId: number;
  selFacilityId: number;
  selGroupId: number;

  updateForm: FormGroup;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let id = params.get('id');
      if (id) {
        this.selectedUserId = id;
        this.userService.getUserById(id).subscribe(
          (res) => {
            this.updateForm.controls['id'].setValue(res.id);
            this.updateForm.controls['userName'].setValue(res.userName);
            this.updateForm.controls['name'].setValue(res.name);
            this.updateForm.controls['surName'].setValue(res.surName);
            this.updateForm.controls['email'].setValue(res.email);
            this.updateForm.controls['phoneNumber'].setValue(res.phoneNumber);
            this.updateForm.controls['idNumber'].setValue(res.idNumber);
            this.updateForm.controls['gender'].setValue(res.gender);
            this.updateForm.controls['birthDay'].setValue(
              this.formatDate(res.birthDay)
            );
            this.updateForm.controls['bloodGroup'].setValue(res.bloodGroup);
            this.updateForm.controls['school'].setValue(res.school);
            this.updateForm.controls['height'].setValue(res.height);
            this.updateForm.controls['weight'].setValue(res.weight);
            this.updateForm.controls['address'].setValue(res.address);
            this.updateForm.controls['emergencyPerson'].setValue(
              res.emergencyPerson
            );
            this.updateForm.controls['diseases'].setValue(res.diseases);
            this.updateForm.controls['allergies'].setValue(res.allergies);
            this.updateForm.controls['foodRestrictions'].setValue(
              res.foodRestrictions
            );
            this.updateForm.controls['cityId'].setValue(res.cityId);
            this.updateForm.controls['facilityId'].setValue(res.facilityId);
            this.updateForm.controls['groupId'].setValue(res.groupId);

            this.selCityId = res.cityId
            this.selFacilityId = res.facilityId
            this.selGroupId = res.groupId
            
            this.fillFacilitySelected()
            this.fillGroupSelected()
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
    this.fillCity();
    this.createForm();
  }
  fillCity() {
    this.dependetDropDownService.getAllCities().subscribe(
      (res) => {
        this.cities = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  fillFacility(cityId: any) {
    this.dependetDropDownService.getAllFacilities(this.selCityId).subscribe(
      (res) => {
        this.facilities = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  fillFacilitySelected() {
    this.fillFacility(this.selCityId);
  }

  fillGroup(facilityId: any) {
    this.dependetDropDownService
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
  fillGroupSelected() {
    this.fillGroup(this.selFacilityId);
  }

  createForm() {
    this.updateForm = this.formBuilder.group({
      id: [''],
      image: [''],
      userName: [''],
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
      gender: [true, Validators.required],
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
      cityId: [],
      facilityId: [],
      groupId: [],
    });
  }

  updateStudent() {
    if (this.updateForm.valid) {
      let email = this.updateForm.get('email').value;
      this.updateForm.get('userName').setValue(email);

      let data: User = Object.assign({}, this.updateForm.value);
      this.userService.updateUser(this.selectedUserId, data).subscribe(
        (res) => {
          alert('Üye Güncellendi');
          this.updateForm.reset();
          this.router.navigate(['/users/students']);
        },
        (err) => {
          alert('Üye güncellenirken bir hata oluştu');
        }
      );
    }
  }

  private formatDate(date: any) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
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
        this.updateForm.controls['image'].setValue(fileByteArray);
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

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  get f() {
    return this.updateForm.controls;
  }
}
