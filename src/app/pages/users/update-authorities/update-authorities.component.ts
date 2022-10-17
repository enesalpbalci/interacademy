import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/models/role.interface';
import { User } from 'src/app/models/user.interface';
import { RoleService } from 'src/app/services/role.service';
import { UserRoleService } from 'src/app/services/user-role.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-authorities',
  templateUrl: './update-authorities.component.html',
  styleUrls: ['./update-authorities.component.css']
})
export class UpdateAuthoritiesComponent implements OnInit {


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService:UserService,
    private roleService:RoleService,
    private userRoleService:UserRoleService,
    private activatedRoute:ActivatedRoute
  ) {}
  updateForm: FormGroup;
  users: User[] = [];
  roles: Role[] = [];

  userId: string;
  passWord = 'aaaa';
  approvedId: string;
  roleName :string;

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      id: [0],
      duration: [0, Validators.required],
      price: [0, Validators.required],
      facilityId: [0, Validators.required],
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
            console.log(error)
          }
        );
      }
    });
    console.log(this.updateForm);
    this.fillRoles();
  }

  fillRoles(){
    this.roleService.getAllRoles().subscribe((res)=>{
      this.roles = res
    },
    (err)=>{
      console.log(err)
    })
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
    if (true || this.updateForm.valid) {
      // await this.setDurationToForm();
      let email = this.updateForm.get('email').value
      this.updateForm.get('userName').setValue(email)
      console.log(email)
      // this.userRoleService.addUserRole().subscribe()
      this.userService
        .addStudent(this.passWord, this.roleName, this.updateForm.value)
        .subscribe((res) => {
          alert('Kullanıcı Eklendi');
          console.log(res);
        },
        (err)=>{
          alert('Kullanıcı eklenirken bir hata oluştu!')
        });
      this.updateForm.reset();
      this.router.navigate(['/users']);
    }
    console.log(this.updateForm.value);
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
  //       this.updateForm.controls['image'].setValue(fileByteArray);
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
