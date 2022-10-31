import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { addMonthToDate } from 'src/app/helper/date.helper';
import { UserIdHelper } from 'src/app/helper/user-id.helper';
import { City } from 'src/app/models/city.interface';
import { Facility } from 'src/app/models/facility.interface';
import { Group } from 'src/app/models/group.interface';
import { PaymentDuration } from 'src/app/models/payment-duration.interface';
import { Product } from 'src/app/models/product.interface';
import { User } from 'src/app/models/user.interface';
import { ContractService } from 'src/app/services/contract.service';
import { DependetDropdownService } from 'src/app/services/dependet-dropdown.service';
import { PaymentDurationService } from 'src/app/services/payment-duration.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { duration } from 'src/assets/vendors/moment/moment';
import { UsersModule } from '../../users/users.module';

@Component({
  selector: 'app-add-contract',
  templateUrl: './add-contract.component.html',
  styleUrls: ['./add-contract.component.css'],
})
export class AddContractComponent implements OnInit {
  addForm: FormGroup;
  users: User[] = [];
  userDetails: User | undefined;
  userId: string;
  cities: City[] = [];
  facilities: Facility[] = [];
  groups: Group[] = [];
  products: Product[] = [];
  selectedProduct: Product;

  selCityId: number;
  selFacilityId: number;

  paymentTypes: {
    duration: number;
    price: number;
    text: string;
  }[];

  constructor(
    private contractService: ContractService,
    private paymentDurationService: PaymentDurationService,
    private productService: ProductService,
    private dependetDropdown: DependetDropdownService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getByContractId();
    this.fillCity();
    this.createForm();
  }

  getByContractId() {
    this.activatedRoute.params.subscribe((params) => {
      this.userService.getUserById(params['id']).subscribe((data) => {
        this.userDetails = data;
        this.selCityId = data.cityId
        this.selFacilityId = data.facilityId
        this.fillFacility();
        this.fillProducts();
        this.addForm.get('studentId').setValue(data.id);
      });
    });
  }

  createForm() {
    this.addForm = this.formBuilder.group({
      cityId: [''],
      facilityId: [''],
      groupId: [''],
      studentId: ['', Validators.required],
      start: ['', [Validators.required]],
      end: [''],
      userId: ['0', Validators.required],
      price: [0],
      approverId: ['0', Validators.required],
      productId: [null, Validators.required],
      installments: [null],
      duration: [],
    });
  }

  addContract() {
    if (this.addForm.valid) {
      this.contractService.addContract(this.addForm.value).subscribe(
        (res) => {
          alert('Kontrat Eklendi');
          this.router.navigate([`/user-contracts/${res.studentId}`]);
          console.log(res);
        },
        (err) => {
          alert('Kontrat eklenirken bir hata oluştu!');
        }
      );
      this.addForm.reset();
    }
    console.log(this.addForm.value);
  }

  fillCity() {
    this.dependetDropdown.getAllCities().subscribe(
      (res) => {
        this.cities = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  fillFacility() {
    this.dependetDropdown.getAllFacilities(this.selCityId).subscribe(
      (res) => {
        this.facilities = res;
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
          this.groups = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  fillProducts() {
    this.productService.getAllProducts(this.selFacilityId).subscribe(
      (res) => {
        this.products = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  setPaymentType() {
    if (this.products.length > 0) {
      const productId = this.addForm.get('productId').value;

      const product = this.products.find((p) => {
        return p.id == productId;
      });

      this.paymentTypes = [];

      this.paymentTypes.push({
        duration: 1,
        price: product.advancePrice,
        text: `Peşin ${product.advancePriceStr}₺`,
      });

      if (product.duration > 1 && product.installmentPrice > 0) {
        this.paymentTypes.push({
          duration: product.duration,
          price: product.installmentPrice,
          text: `Taksit ${product.duration} Ay ${product.installmentPriceStr}₺ Toplam ${product.installmentTotalStr}₺`,
        });
      }

      this.addForm
        .get('duration')
        .setValue(
          this.paymentTypes.length > 1 ? this.paymentTypes[1].duration : 1
        );
      this.startDateOnChange();
    }
  }

  startDateOnChange() {
    let startDate = this.addForm.get('start').value;

    startDate = new Date(startDate);

    let endDate = addMonthToDate(startDate, this.addForm.get('duration').value);

    this.addForm.get('end').setValue(this.formatDate(endDate));
  }

  private formatDate(date: any) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  get f() {
    return this.addForm.controls;
  }
}
