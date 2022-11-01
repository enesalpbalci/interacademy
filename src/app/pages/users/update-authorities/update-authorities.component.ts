import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/models/role.interface';
import { User } from 'src/app/models/user.interface';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-authorities',
  templateUrl: './update-authorities.component.html',
  styleUrls: ['./update-authorities.component.css'],
})
export class UpdateAuthoritiesComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private roleService: RoleService,
    private activatedRoute: ActivatedRoute
  ) {}

  updateForm: FormGroup;
  users: User[] = [];
  roles: Role[] = [];

  userId: string;
  approvedId: string;

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      // roleName: ['', Validators.required],
      id: [],
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
    });
    this.activatedRoute.paramMap.subscribe((params) => {
      let id = params.get('id');
      if (id) {
        this.userId = id;
        this.userService.getUserById(id).subscribe(
          (res) => {
            this.updateForm.controls['id'].setValue(res.id);
            this.updateForm.controls['name'].setValue(res.name);
            this.updateForm.controls['surName'].setValue(res.surName);
            this.updateForm.controls['email'].setValue(res.email);
            this.updateForm.controls['phoneNumber'].setValue(res.phoneNumber);
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
    this.fillRoles();
  }

  updateAuthority() {
    if (this.updateForm.valid) {
      let data: User = Object.assign({}, this.updateForm.value);
      let email = this.updateForm.get('email').value;
      this.updateForm.get('userName').setValue(email);

      this.userService.updateUser(data, this.updateForm.value).subscribe(
        (res) => {
          alert('Kullanıcı Güncellendi');
        },
        (err) => {
          alert('Kullanıcı güncellenirdek bir hata oluştu!');
        }
      );
      this.updateForm.reset();
      this.router.navigate(['/users/authorities']);
    }
  }

  fillRoles() {
    this.roleService.getAllRoles().subscribe(
      (res) => {
        this.roles = res;
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
      if (matchingControl.errors && !matchingControl.errors.MustMatch) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ MustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  get f() {
    return this.updateForm.controls;
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
