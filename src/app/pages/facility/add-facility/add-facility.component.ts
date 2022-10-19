import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from 'src/app/models/city.interface';
import { CityService } from 'src/app/services/city.service';
import { FacilityService } from 'src/app/services/facility.service';

@Component({
  selector: 'app-add-facility',
  templateUrl: './add-facility.component.html',
  styleUrls: ['./add-facility.component.css'],
})
export class AddFacilityComponent implements OnInit {
  cityList: City[]=[];
  addForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private facilityService: FacilityService,
    private cityService: CityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      id: [0],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      cityId: [, Validators.required],
    });
    this.getAllCities();
  }

  getAllCities() {
    this.cityService.getAllCities().subscribe((res) => {
      console.log(res);
      this.cityList = res;
    },
    (err)=>{
      console.log(err)
    });
  }

  addFacility() {
    if (this.addForm.valid) {
      this.facilityService.addFacility(this.addForm.value).subscribe(
        (res) => {
          alert('Tesis eklendi');
          this.addForm.reset();
          this.router.navigate(['/facilities']);
        },
        (err) => {
          alert('Tesis eklenirken bir hata oluştu');
        }
      );
    }
  }

  get f(){
    return this.addForm.controls
  }
}
