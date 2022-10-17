import { Component, OnInit, OnDestroy } from '@angular/core';
import { PaymentDuration } from 'src/app/models/payment-duration.interface';
import { PaymentDurationService } from 'src/app/services/payment-duration.service';
import { City } from 'src/app/models/city.interface';
import { Facility } from 'src/app/models/facility.interface';
import { DependetDropdownService } from 'src/app/services/dependet-dropdown.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list-payment-durations',
  templateUrl: './list-payment-durations.component.html',
  styleUrls: ['./list-payment-durations.component.css'],
})
export class ListPaymentDurationsComponent implements OnInit, OnDestroy {
  allCities: City[] = [];
  allFacilities: Facility[] = [];
  allPaymentDurations: PaymentDuration[] = [];

  hide: boolean = false;

  listForm: FormGroup;

  selCityId: number;
  selFacilityId: number;

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private paymentDurationService: PaymentDurationService,
    private dependetDropdown: DependetDropdownService,
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
      buttons: ['excel', 'pdfHtml5', 'print'],
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
          this.dtTrigger.next(null);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  removePaymentDuration(id: any) {
    if (confirm('Silmek istediğinize emin misiniz?')) {
      this.paymentDurationService.removePaymentDuration(id).subscribe(
        (res) => {
          this.paymentDurationService.getAllPaymentDurations(id);
          this.fillListPaymentDuration();
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
