import { Component, OnInit, OnDestroy } from '@angular/core';
import { Group } from 'src/app/models/group.interface';
import { DependetDropdownService } from 'src/app/services/dependet-dropdown.service';
import { GroupService } from 'src/app/services/group.service';

import { Observable, Subject } from 'rxjs';
import { City } from 'src/app/models/city.interface';
import { Facility } from 'src/app/models/facility.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.css'],
})
export class ListGroupComponent implements OnInit, OnDestroy{
  allCities: City[] = [];
  allFacilities: Facility[] = [];
  allGroups: Group[] = [];

  hide: boolean = false;

  listForm: FormGroup;

  selCityId: number = 0;
  selFacilityId: number;

  
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private groupService: GroupService,
    private dependetDropdown: DependetDropdownService,
    private formBuilder: FormBuilder,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      language: {
        url: '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Turkish.json',
      },
      dom: 'Bfrtip',
      buttons:[{
        text: 'Grup Ekle',
        action: (): void => {
          this.router.navigate(['/groups/add']);
        },
        className: 'btn btn-info',
      },'excel', 'pdfHtml5', 'print'],
      responsive: true,
      lengthMenu: [5, 15, 25],
      destroy:true
    };
    this.listForm = this.formBuilder.group({
      city: [],
      facility: [],
      group: [],
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
          this.allGroups = res;
          this.dtTrigger.next(null);
        },
        (err) => {
          console.log(err);
        }
      );
  }
  removeGroup(id: any) {
    if (confirm('Silmek istediğinize emin misiniz?')) {
      this.groupService.removeGroup(id).subscribe(
        (res) => {
          console.log(res);
          this.fillGroup();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
