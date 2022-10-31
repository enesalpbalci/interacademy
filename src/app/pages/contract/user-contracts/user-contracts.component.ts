import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { City } from 'src/app/models/city.interface';
import { Contract } from 'src/app/models/contract.interface';
import { Facility } from 'src/app/models/facility.interface';
import { Group } from 'src/app/models/group.interface';
import { Product } from 'src/app/models/product.interface';
import { ContractService } from 'src/app/services/contract.service';
import { DependetDropdownService } from 'src/app/services/dependet-dropdown.service';

@Component({
  selector: 'app-user-contracts',
  templateUrl: './user-contracts.component.html',
  styleUrls: ['./user-contracts.component.css'],
})
export class UserContractsComponent implements OnInit, OnDestroy {
  allContracts: Contract[] = [];
  allCities: City[] = [];
  allFacilities: Facility[] = [];
  allGroups: Group[] = [];
  contracts: Contract;

  product: Product;

  userName: string;

  selCityId: number = 0;
  selFacilityId: number;
  selGroupId: number;

  dtOptions: any = {};
  dtTrigger: Subject<void> = new Subject<void>();

  constructor(
    private contractService: ContractService,
    private dependetDropdown: DependetDropdownService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      language: {
        url: '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Turkish.json',
      },
      dom: 'Bfrtip',
      buttons: ['excel', 'pdf', 'print'],
      responsive: true,
      lengthMenu: [5, 15, 25],
      destroy: true,
    };
    this.activatedRoute.params.subscribe((data) => {
      this.contractService
        .getContractStudentById(data['id'])
        .subscribe((data) => {
          this.allContracts = data;
          if (data.length > 0) {
            this.userName = this.allContracts[0].student.name + " " +  this.allContracts[0].student.surName
          }
        });
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
