import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  NG_ASYNC_VALIDATORS,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/app/models/city.interface';
import { Facility } from 'src/app/models/facility.interface';
import { Product } from 'src/app/models/product.interface';
import { CityService } from 'src/app/services/city.service';
import { DependetDropdownService } from 'src/app/services/dependet-dropdown.service';
import { FacilityService } from 'src/app/services/facility.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dependetDropdown: DependetDropdownService,
    private router: Router
  ) {}

  products: Product[] = [];
  allCity: City[] = [];
  allFacility: Facility[] = [];

  selCityId: number;
  productId: string;

  updateForm: FormGroup;

  fillCity() {
    this.dependetDropdown.getAllCities().subscribe(
      (res) => {
        this.allCity = res;
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
        this.allFacility = res;
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

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      id: [0],
      name: ['', Validators.required],
      duration: [0, Validators.required],
      price: [0, Validators.required],
      facilityId: [0],
      cityId: [null],
      advancePrice: [null, Validators.required],
      installmentPrice: [null],
      installmentTotal: [null],
    });
    this.getProducts();
    this.fillCity();
  }

  getProducts() {
    this.activatedRoute.paramMap.subscribe((params) => {
      let id = params.get('id');
      if (id) {
        this.productId = id;
        this.productService.getProductById(id).subscribe(
          (res) => {
            this.updateForm.controls['id'].setValue(res.id);
            this.updateForm.controls['name'].setValue(res.name);
            this.updateForm.controls['duration'].setValue(res.duration);
            this.updateForm.controls['advancePrice'].setValue(res.advancePrice);
            this.updateForm.controls['facilityId'].setValue(res.facilityId);
            this.updateForm.controls['installmentPrice'].setValue(
              res.installmentPrice
            );
            this.updateForm.controls['installmentTotal'].setValue(
              res.installmentTotal
            );
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }

  updateProduct() {
    if (this.updateForm.valid) {
      let data: Product = Object.assign({}, this.updateForm.value);
      this.productService.updateProduct(this.productId, data).subscribe(
        (res) => {
          alert('Kontrat paketi güncellendi');
          this.updateForm.reset();
          this.router.navigate(['/products']);
        },
        (err) => {
          alert('Kontrat paketi güncellenirken bir hata oluştu');
        }
      );
    }
  }

  calculatePrice() {
    const duration = parseInt(this.updateForm.get('duration').value || null=== 0);
    const installmentPrice = parseInt(
      this.updateForm.get('installmentPrice').value || null === 0
    );

    if (installmentPrice === 0) {
      return;
    }

    const installmentTotalAmount = installmentPrice * duration;

    this.updateForm.get('installmentTotal').setValue(installmentTotalAmount);
  }

  get f() {
    return this.updateForm.controls;
  }
}
