import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/app/models/city.interface';
import { Facility } from 'src/app/models/facility.interface';
import { CityService } from 'src/app/services/city.service';
import { FacilityService } from 'src/app/services/facility.service';

@Component({
  selector: 'app-update-facility',
  templateUrl: './update-facility.component.html',
  styleUrls: ['./update-facility.component.css'],
})
export class UpdateFacilityComponent implements OnInit {
  constructor(
    private facilityService: FacilityService,
    private cityService: CityService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  cityList: City[]=[];

  facilityId: string;
  updateForm: FormGroup;

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      id: [this.facilityId],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      cityId: [''],
    });

    this.activatedRoute.paramMap.subscribe((params) => {
      let id = params.get('id');
      if (id) {
        this.facilityId = id;
        this.facilityService.getFacilityById(id).subscribe(
          (res) => {
            this.updateForm.controls['id'].setValue(res.id);
            this.updateForm.controls['name'].setValue(res.name);
            this.updateForm.controls['cityId'].setValue(res.cityId);
            // this.updateForm.controls['city'].setValue(
            //   res.city.plateCode,
            //   res.city.name
            // );
            // this.updateForm.controls['deleted'].setValue(res.deleted);
          },
          (err) => {
            console.log(err)
          }
        );
      }
    });
    this.getAllCities();
  }

  updateFacility() {
    if (this.updateForm.valid) {
      let data: Facility = Object.assign({}, this.updateForm.value);
      this.facilityService.updateFacility(this.facilityId, data).subscribe(
        (res) => {
          alert('Tesis Güncellendi');
          this.updateForm.reset();
          this.router.navigate(['/facilities']);
        },
        (err) => {
          alert('Tesis güncellenirken bir hata oluştu');
        }
      );
    }
  }
  getAllCities() {
    this.cityService.getAllCities().subscribe((data: any) => {
      this.cityList = data;
    },
    (err)=>{
      console.log(err)
    });
  }

  get f(){
    return this.updateForm.controls
  }
}
