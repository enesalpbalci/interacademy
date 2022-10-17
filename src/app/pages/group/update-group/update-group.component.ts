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

  allCity: City[] = [];
  allFacility: Facility[] = [];
  allGroup: Group[] = [];

  selCityId: number;

  groupId: string;
  updateForm: FormGroup;

  ngOnInit(): void {
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
    this.activatedRoute.paramMap.subscribe((params) => {
      let id = params.get('id');
      if (id) {
        this.groupId = id;
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

  fillCity() {
    this.dependetDropdown.getAllCities().subscribe(
      (res) => {
        this.allCity = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  fillFacility() {
    this.dependetDropdown.getAllFacilities(this.selCityId).subscribe((res)=>{
      this.allFacility=res
    },
    (err)=>{
      console.log(err)
    });
  }

  updateGroup() {
    if (this.updateForm.valid) {
      let data: Group = Object.assign({}, this.updateForm.value);
      this.groupService.updateGroup(this.groupId, data).subscribe(
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
}
