import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/role.interface';
import { User } from 'src/app/models/user.interface';
import { RoleService } from 'src/app/services/role.service';
import { UserRoleService } from 'src/app/services/user-role.service';
import { UserService } from 'src/app/services/user.service';
import { PasswordStrengthValidator } from 'src/app/validators/password.validators';
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
  ) {}

  addForm: FormGroup;
  users: User[] = [];
  roles: Role[] = [];

  approvedId: string;
  roleName: string;

  ngOnInit(): void {
    this.addForm = this.formBuilder.group(
      {
        roleName: ['', Validators.required],
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
        passWord: [
          '',
          [
            Validators.required,
            PasswordStrengthValidator,
            Validators.minLength(8),
          ],
        ],
        confirmPassWord: ['', [Validators.required, PasswordStrengthValidator]],
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
      },
      {
        validators: this.MustMatch('passWord', 'confirmPassWord'),
      }
    );
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

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (
        typeof matchingControl === 'undefined' ||
        matchingControl.errors?.MustMatch
      ) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ MustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  addUser() {
    if (this.addForm.valid) {
      let email = this.addForm.get('email').value;
      this.addForm.get('userName').setValue(email);

      let passWord = this.addForm.get('passWord').value;

      let userRole = this.addForm.get('roleName').value;

      this.userService
        .addUser(passWord, userRole, this.addForm.value)
        .subscribe(
          (res) => {
            alert('Kullan??c?? Eklendi');
            console.log(res);
          },
          (err) => {
            alert('Kullan??c?? eklenirken bir hata olu??tu!');
          }
        );
      this.addForm.reset();
      this.router.navigate(['/users/authorities']);
    }
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
