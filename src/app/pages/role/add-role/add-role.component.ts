import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {
  addForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private roleService:RoleService, private router:Router) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      name: this.formBuilder.control('', Validators.required)
    });
  }

  addRole(){
    if(this.addForm.valid){
      this.roleService.addRole(this.addForm.value).subscribe(
        (res)=>{
          alert("Rol eklendi")
          this.addForm.reset();
          this.router.navigate(['/roles'])
        },
        (err)=>{
          alert("Rol eklenirken bir hata oluştu")
        }
      );
    }
  }
}
