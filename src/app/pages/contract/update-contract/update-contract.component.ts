import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { addMonthToDate } from 'src/app/helper/date.helper';
import { UserIdHelper } from 'src/app/helper/user-id.helper';
import { City } from 'src/app/models/city.interface';
import { Contract } from 'src/app/models/contract.interface';
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

@Component({
  selector: 'app-update-contract',
  templateUrl: './update-contract.component.html',
  styleUrls: ['./update-contract.component.css'],
})
export class UpdateContractComponent implements OnInit {
  updateForm: FormGroup;

  users: User[] = [];
  userDetails: User | undefined;
  contract: Contract;
  userId: string;
  cities: City[] = [];
  facilities: Facility[] = [];
  groups: Group[] = [];
  products: Product[] = [];
  // selectedDuration: PaymentDuration;
  selCityId: number;
  selFacilityId: number;

  paymentTypes: {
    duration: number;
    price: number;
    text: string;
  }[];

  approved: boolean = true;

  constructor(
    private contractService: ContractService,
    private productService: ProductService,
    private dependetDropdown: DependetDropdownService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userId = UserIdHelper();
    console.log(UserIdHelper());
    this.createForm();
    this.loadForm();
  }

  getByContractId() {
    this.activatedRoute.params.subscribe((params) => {
      this.contractService.getContractById(params['id']).subscribe((data) => {
        this.contract = data;
        this.updateForm.get('studentId').setValue(data.student.id);
        this.updateForm.controls['id'].setValue(data.id);
        this.updateForm.controls['name'].setValue(data.student.name);
        this.updateForm.controls['surName'].setValue(data.student.surName);
        this.updateForm.controls['email'].setValue(data.student.email);
        this.updateForm.controls['phoneNumber'].setValue(
          data.student.phoneNumber
        );
        this.updateForm.controls['userId'].setValue(data.userId);

        let facility = this.facilities.filter(
          (e) => e.id == data.product.facilityId
        )[0];
        this.updateForm.controls['cityId'].setValue(facility.cityId);
        this.fillProducts(facility.id);
        this.updateForm.controls['facilityId'].setValue(
          data.product.facilityId
        );
        this.updateForm.controls['productId'].setValue(data.productId);
        this.updateForm.controls['installments'].setValue(data.installments);
        this.updateForm.controls['start'].setValue(this.formatDate(data.start));
        this.updateForm.controls['price'].setValue(data.price);
        this.updateForm.controls['end'].setValue(this.formatDate(data.end));
        this.updateForm.controls['duration'].setValue(data.product.duration);
        this.updateForm.controls['approverId'].setValue(data.approverId);
      });
    });
  }

  createForm() {
    this.updateForm = this.formBuilder.group({
      id: [],
      cityId: [''],
      facilityId: [''],
      studentId: ['', Validators.required],
      start: ['', [Validators.required]],
      userId: ['', Validators.required],
      productId: [null],
      price: [null, Validators.required],
      approverId: ['0', Validators.required],
      installments: [null, Validators.required],
      end:[''],
      name: [],
      surName: [],
      email: [],
      phoneNumber: [],
      approved: [],
      duration:[],
    });
  }
  checkValue(event: any) {
    console.log(event);
  }
  getApproved(){
    return this.updateForm.controls["approverId"]
  }

  updateContract() {
    if (this.updateForm.valid) {
      // await this.setDurationToForm();
      let data: Contract = Object.assign({}, this.updateForm.value);
      this.contractService
        .updateContract(data.id, this.updateForm.value, this.approved)
        .subscribe(
          (res) => {
            alert('Kontrat Güncellendi');
            console.log(res);
          },
          (err) => {
            alert('Kontrat güncellenirken bir hata oluştu!');
          }
        );
      this.updateForm.reset();
      this.router.navigate(['/contracts']);
    }
    console.log(this.updateForm.value);
  }

  setPaymentType() {
    if (this.products.length > 0) {
      const productId = this.updateForm.get('productId').value;

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

      this.updateForm
        .get('duration')
        .setValue(
          this.paymentTypes.length > 1 ? this.paymentTypes[1].duration : 1
        );
      this.startDateOnChange();
    }
  }

  startDateOnChange() {
    let startDate = this.updateForm.get('start').value;

    startDate = new Date(startDate);

    let endDate = addMonthToDate(startDate, this.updateForm.get('duration').value);

    this.updateForm.get('end').setValue(this.formatDate(endDate));
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

  fillCity() {
    this.dependetDropdown.getAllCities().subscribe(
      (res) => {
        this.cities = res;
        return res;
      },
      (err) => {
        console.log(err);
        return null;
      }
    );
  }
  fillFacility(cityId: number) {
    this.dependetDropdown.getAllFacilities(cityId).subscribe(
      (res) => {
        this.facilities = res;
        return res;
      },
      (err) => {
        console.log(err);
        return null;
      }
    );
  }
  fillFacilitySelected() {
    this.fillFacility(this.selCityId);
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

  fillProducts(facilityId: number) {
    this.productService.getAllProducts(facilityId).subscribe(
      (res) => {
        console.log(res);
        this.products = res;
        this.setPaymentType();
        return res;
      },
      (err) => {
        console.log(err);
        return null;
      }
    );
  }
  fillProductSelected() {
    this.fillProducts(this.selFacilityId);
  }

  get f() {
    return this.updateForm.controls;
  }

  loadForm() {
    this.dependetDropdown.getAllCities().subscribe(
      (cRes) => {
        this.cities = cRes;
        this.dependetDropdown.getAllFacilities(null).subscribe(
          (fRes) => {
            this.facilities = fRes;
            this.getByContractId();
          },
          (err) => {
            console.log(err);
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
