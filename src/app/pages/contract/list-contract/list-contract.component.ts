import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  OnChanges,
} from '@angular/core';
import { Subject } from 'rxjs';
import { City } from 'src/app/models/city.interface';
import { Contract } from 'src/app/models/contract.interface';
import { Facility } from 'src/app/models/facility.interface';
import { Group } from 'src/app/models/group.interface';
import { ContractService } from 'src/app/services/contract.service';
import { DependetDropdownService } from 'src/app/services/dependet-dropdown.service';

@Component({
  selector: 'app-list-contract',
  templateUrl: './list-contract.component.html',
  styleUrls: ['./list-contract.component.css'],
})
export class ListContractComponent implements  OnInit,OnDestroy {
  allContracts: Contract[] = [];
  allCities: City[] = [];
  allFacilities: Facility[] = [];
  allGroups: Group[] = [];

  selCityId: number = 0;
  selFacilityId: number;
  selGroupId: number;

  dtOptions: any = {};
  dtTrigger: Subject<void> = new Subject<void>();

  constructor(
    private contractService: ContractService,
    private dependetDropdown: DependetDropdownService
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      language: {
        url: '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Turkish.json',
      },
      dom: 'Bfrtip',
      buttons:['excel', 'pdf', 'print'],
      responsive: true,
      lengthMenu: [5, 15, 25],
      destroy:true
    };
    this.fillCity();
  }

  fillContract() {
    this.contractService.getAllContract().subscribe((res) => {
      this.allContracts = res;
      this.dtTrigger.next();
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
        },
        (err) => {
          console.log(err);
        }
      );
  }

  showTable: boolean = false;
  toggleShowTable(): void {
    this.showTable = !this.showTable;
    this.fillContract();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
