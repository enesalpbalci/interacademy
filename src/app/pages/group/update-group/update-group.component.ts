import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from 'src/app/models/group.interface';
import { FacilityService } from 'src/app/services/facility.service';
import { GroupService } from 'src/app/services/group.service';
import { Observable } from 'rxjs';
import { City } from 'src/app/models/city.interface';
import { Facility } from 'src/app/models/facility.interface';
import { DependetDropdownService } from 'src/app/services/dependet-dropdown.service';

@Component({
  selector: 'app-update-group',
  templateUrl: './update-group.component.html',
  styleUrls: ['./update-group.component.css'],
})
export class UpdateGroupComponent implements OnInit {
  constructor(
    private dependetDropdown: DependetDropdownService,
    private groupService: GroupService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  allCities: City[] = [];
  allFacilities: Facility[] = [];
  allGroups: Group[] = [];

  selectedCity: number;
  selectedGroup: string;
  updateForm: FormGroup;

  ngOnInit(): void {

    this.createForm();

    this.activatedRoute.paramMap.subscribe((params) => {
      let id = params.get('id');
      if (id) {
        this.selectedGroup = id
        this.groupService.getGroupById(id).subscribe(
          (res) => {
            this.updateForm.controls['id'].setValue(res.id);
            this.updateForm.controls['name'].setValue(res.name);
            this.updateForm.controls['facilityId'].setValue(res.facilityId);
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
    this.fillCity();
  }
  createForm() {
    this.updateForm = this.formBuilder.group({
      id: [''],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      facilityId: [''],
    });
  }

  fillCity() {
    this.dependetDropdown.getAllCities().subscribe(
      (res) => {
        this.allCities = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  fillFacility() {
    this.dependetDropdown
      .getAllFacilities(this.selectedCity)
      .subscribe(
        (res) => {
          this.allFacilities = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  updateGroup() {
    if (this.updateForm.valid) {
      let data: Group = Object.assign({}, this.updateForm.value);
      this.groupService.updateGroup(this.selectedGroup, data).subscribe(
        (res) => {
          alert('Grup Güncellendi');
          this.updateForm.reset();
          this.router.navigate(['/groups']);
        },
        (err) => {
          alert('Grup güncellenirken bir hata oluştu');
        }
      );
    }
  }
  checkFormByPropertyName(name: string) {
    if (
      this.updateForm.controls[name].invalid &&
      this.updateForm.controls[name].errors?.required &&
      (this.updateForm.controls[name].dirty ||
        this.updateForm.controls[name].touched)
    ) {
      return true;
    }
  }
}
