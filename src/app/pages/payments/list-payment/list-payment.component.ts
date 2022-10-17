import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { City } from 'src/app/models/city.interface';
import { Facility } from 'src/app/models/facility.interface';
import { PaymentDuration } from 'src/app/models/payment-duration.interface';
import { Payment } from 'src/app/models/payment.interface';
import { DependetDropdownService } from 'src/app/services/dependet-dropdown.service';
import { PaymentDurationService } from 'src/app/services/payment-duration.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-list-payment',
  templateUrl: './list-payment.component.html',
  styleUrls: ['./list-payment.component.css'],
})
export class ListPaymentComponent implements OnInit, OnDestroy {
  allCities: City[] = [];
  allFacilities: Facility[] = [];
  allPayments: Payment[] = [];
  allPaymentDurations: PaymentDuration[] = [];

  listForm: FormGroup;

  selCityId: number = 0;
  selFacilityId: number;

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private dependetDropdown: DependetDropdownService,
    private paymentService: PaymentService,
    private paymentDurationService: PaymentDurationService,
    private formBuilder: FormBuilder
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
      destroy:true
    };
    this.listForm = this.formBuilder.group({
      contractId: [],
      paymentDat: [],
      amount: [],
      userId: [],
      dueDate: [],
      user: [],
    });
    this.fillCity();
  }

  fillPaymentList() {
    this.paymentService.getAllPayments().subscribe(
      (res) => {
        this.allPayments = res;
        this.dtTrigger.next(null);
      },
      (err) => {
        console.log(err);
      }
    );
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
  fillListPaymentDuration() {
    this.paymentDurationService
      .getAllPaymentDurations(this.selFacilityId)
      .subscribe(
        (res) => {
          this.allPaymentDurations = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  showTable: boolean = false;
  toggleShowTable(): void {
    this.showTable = !this.showTable;
    this.fillPaymentList();
  }
}
