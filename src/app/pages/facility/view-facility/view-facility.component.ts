import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { City } from 'src/app/models/city.interface';
import { Facility } from 'src/app/models/facility.interface';
import { FacilityService } from 'src/app/services/facility.service';

@Component({
  selector: 'app-view-facility',
  templateUrl: './view-facility.component.html',
  styleUrls: ['./view-facility.component.css'],
})
export class ViewFacilityComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private facilityService: FacilityService
  ) {}

  facility: Facility;
  cityId: City;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.facilityService.getFacilityById(params['id']).subscribe((data) => {
        this.facility = data;
      });
    });
  }
}
