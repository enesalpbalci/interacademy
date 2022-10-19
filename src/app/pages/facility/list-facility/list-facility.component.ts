import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { FacilityService } from 'src/app/services/facility.service';
import { Subject } from 'rxjs';
import { DependetDropdownService } from 'src/app/services/dependet-dropdown.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { City } from 'src/app/models/city.interface';
import { Facility } from 'src/app/models/facility.interface';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-list-facility',
  templateUrl: './list-facility.component.html',
  styleUrls: ['./list-facility.component.css'],
})
export class ListFacilityComponent implements AfterViewInit, OnInit, OnDestroy {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
	dtOptions: DataTables.Settings = {};
	dtInstance:DataTables.Api;
	dtTrigger = new Subject();

  allCities: City[] = [];
  allFacilities: Facility[] = [];

  selCityId: number = 0;

  listForm: FormGroup;
  
  constructor(
    private dependetDropdown: DependetDropdownService,
    private facilityService: FacilityService,
    private formBuilder: FormBuilder
  ) {}

  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next(null);
    });
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      language: {
        url: '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Turkish.json',
      },
      dom: 'Bfrtip',
      responsive: true,
      lengthMenu: [5, 15, 25],
      destroy:true
    };
    this.listForm = this.formBuilder.group({
      city: [],
      facility: [],
    });
    this.fillCity();
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
    this.dependetDropdown.getAllFacilities(this.selCityId).subscribe(
      (res) => {
        this.allFacilities = res;
        this.rerender()
      },
      (err) => {
        console.log(err);
      }
    );
  }

  removeFacility(id: any) {
    this.facilityService.removeFacility(id).subscribe(
      (res) => {
        if (confirm('Tesisi silmek istediğinize emin misiniz?'))
          this.fillFacility();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
