import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/models/role.interface';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.css'],
})
export class UpdateRoleComponent implements OnInit {
  constructor(
    private roleService: RoleService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  roleId: string;
  updateForm: FormGroup;

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      normalizedName: [''],
      concurrencyStamp: [''],
    });
    this.activatedRoute.paramMap.subscribe((params) => {
      let id = params.get('id');
      if (id) {
        this.roleId = id;
        this.roleService.getRoleById(id).subscribe(
          (res) => {
            this.updateForm.controls['id'].setValue(res.id);
            this.updateForm.controls['name'].setValue(res.name);
            this.updateForm.controls['normalizedName'].setValue(
              res.normalizedName
            );
            this.updateForm.controls['concurrencyStamp'].setValue(
              res.concurrencyStamp
            );
          },
          (error) => {}
        );
      }
    });
  }

  updateRole() {
    if (this.updateForm.valid) {
      let data: Role = Object.assign({}, this.updateForm.value);
      this.roleService.updateRole(this.roleId, data).subscribe(
        (res) => {
          alert('Rol Güncellendi');
          this.updateForm.reset();
          this.router.navigate(['/roles']);
        },
        (err) => {
          alert('Rol güncellenirken bir hata oluştu');
        }
      );
    }
  }
}
