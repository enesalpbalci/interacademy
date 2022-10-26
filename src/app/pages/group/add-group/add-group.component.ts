import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/services/group.service';
import { City } from 'src/app/models/city.interface';
import { Facility } from 'src/app/models/facility.interface';
import { Group } from 'src/app/models/group.interface';
import { DependetDropdownService } from 'src/app/services/dependet-dropdown.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css'],
})
export class AddGroupComponent implements OnInit {
  allCity: City[] = [];
  allFacility: Facility[] = [];
  allGroup: Group[] = [];

  selCityId: number = 0;
  selFacilityId: number = 0;

  city: FormGroup;
  addForm: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private groupService: GroupService,
    private dependetDropdown: DependetDropdownService,
    private router: Router
  ) {}

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
    this.dependetDropdown.getAllFacilities(this.selCityId).subscribe(
      (res) => {
        this.allFacility = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  fillGroup() {
    this.dependetDropdown
      .getAllGroups(this.selFacilityId, this.selCityId)
      .subscribe(
        (res) => {
          this.allGroup = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  ngOnInit(): void {
    this.createForm();
    this.fillCity();
  }

  createForm() {
    this.addForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      facilityId: [0, Validators.required],
    });
  }

  addGroup() {
    if (this.addForm.valid) {
      this.groupService.addGroup(this.addForm.value).subscribe(
        (res) => {
          alert('Grup eklendi');
          this.addForm.reset();
          this.router.navigate(['/groups']);
        },
        (err) => {
          alert('Grup eklenirken bir hata oluştu');
        }
      );
    }
  }

  get f() {
    return this.addForm.controls;
  }
}
