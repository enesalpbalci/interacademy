import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from 'src/app/models/city.interface';
import { Facility } from 'src/app/models/facility.interface';
import { Group } from 'src/app/models/group.interface';
import { Role } from 'src/app/models/role.interface';
import { User } from 'src/app/models/user.interface';
import { ContractService } from 'src/app/services/contract.service';
import { DependetDropdownService } from 'src/app/services/dependet-dropdown.service';
import { PaymentDurationService } from 'src/app/services/payment-duration.service';
import { RoleService } from 'src/app/services/role.service';
import { UserRoleService } from 'src/app/services/user-role.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-add-authorities',
  templateUrl: './add-authorities.component.html',
  styleUrls: ['./add-authorities.component.css'],
})
export class AddAuthoritiesComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private roleService: RoleService,
    private userRoleService: UserRoleService,
  ) {}
  addForm: FormGroup;
  users: User[] = [];
  roles: Role[] = [];

  passWord : any;
  approvedId: string;
  roleName: string;

  ngOnInit(): void {
    this.addForm = this.formBuilder.group(
      {
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
      }
      // {
      //   validators: this.MustMuch('passWord', 'confirmPassword'),
      // }
    );
    console.log(this.addForm);
    this.fillRoles();
  }

  fillRoles() {
    this.roleService.getAllRoles().subscribe(
      (res) => {
        this.roles = res.filter(
          (r) => r.name != 'Student' && r.name != 'Parent'
        );
      },
      (err) => {
        console.log(err);
      }
    );
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

  addUser() {
    if (true || this.addForm.valid) {
      // await this.setDurationToForm();
      let email = this.addForm.get('email').value;
      this.addForm.get('userName').setValue(email);

      console.log(email);
      // this.userRoleService.addUserRole().subscribe()
      this.userService
        .addUser(this.passWord, this.roleName, this.addForm.value)
        .subscribe(
          (res) => {
            alert('Kullanıcı Eklendi');
            console.log(res);
          },
          (err) => {
            alert('Kullanıcı eklenirken bir hata oluştu!');
          }
        );
      this.addForm.reset();
      this.router.navigate(['/users']);
    }
    console.log(this.addForm.value);
  }

  // onFileChanged(e: any) {
  //   let files = e.target.files;
  //   if (files[0]) {
  //     this.readAsByteArray(files[0]);
  //     this.readAsDataURL(files[0]);
  //   }
  // }

  // readAsByteArray(file: any) {
  //   let reader = new FileReader();
  //   let fileByteArray: number[] = [];
  //   reader.readAsArrayBuffer(file);
  //   reader.onloadend = (evt) => {
  //     if (evt.target.readyState == FileReader.DONE) {
  //       this.url = evt.target.result as string;
  //       let arrayBuffer = evt.target.result as ArrayBuffer;
  //       let array = new Uint8Array(arrayBuffer);
  //       for (let i = 0; i < array.length; i++) {
  //         fileByteArray.push(array[i]);
  //       }
  //       this.addForm.controls['image'].setValue(fileByteArray);
  //     }
  //   };
  // }

  // readAsDataURL(file: any) {
  //   let reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = (event: any) => {
  //     this.url = event.target.result;
  //   };
  // }

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

  async setRole(): Promise<boolean> {
    const paymentDurationId = this.addForm.get('paymentDurationId').value;

    console.log(paymentDurationId, this.roles);
    const duration: Role = this.roles.find((paymentDuration) => {
      if (paymentDuration.id == paymentDurationId) {
        return paymentDuration;
      }
    });

    if (typeof duration !== 'undefined') {
      this.addForm.get('userId').setValue(duration.id);
    }

    return true;
  }
}
