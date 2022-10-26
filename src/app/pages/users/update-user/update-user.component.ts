import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.interface';
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
    private formBuilder: FormBuilder
  ) {}

  url: string;

  selectedUserId: string;

  updateForm: FormGroup;

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((params) => {
      let id = params.get('id');
      if (id) {
        this.selectedUserId = id
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
            this.updateForm.controls['birthDay'].setValue(res.birthDay);
            this.updateForm.controls['bloodGroup'].setValue(res.bloodGroup);
            this.updateForm.controls['school'].setValue(res.school);
            this.updateForm.controls['height'].setValue(res.height);
            this.updateForm.controls['weight'].setValue(res.weight);
            this.updateForm.controls['address'].setValue(res.address);
            this.updateForm.controls['emergencyPerson'].setValue(res.emergencyPerson);
            this.updateForm.controls['diseases'].setValue(res.diseases);
            this.updateForm.controls['allergies'].setValue(res.allergies);
            this.updateForm.controls['foodRestrictions'].setValue(res.foodRestrictions);
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });

    this.createForm();
  }

  createForm() {
    this.updateForm = this.formBuilder.group({
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
    });
  }

  updateStudent() {
    // this.userService
    //   .updateUser(this.userDetails.id, this.userDetails)
    //   .subscribe((user) => {
    //     this.router.navigate(['users/']);
    //   });
    if (true || this.updateForm.valid) {
      let email = this.updateForm.get('email').value
      this.updateForm.get('userName').setValue(email)

      // let motherEmail = this.updateForm.get('mother.email').value
      // this.updateForm.get('mother.userName').setValue(motherEmail)
      
      // let fatherEmail = this.updateForm.get('father.email').value
      // this.updateForm.get('father.userName').setValue(fatherEmail)

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
}
