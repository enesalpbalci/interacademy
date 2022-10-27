import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from 'src/app/models/city.interface';
import { Facility } from 'src/app/models/facility.interface';
import { Product } from 'src/app/models/product.interface';
import { DependetDropdownService } from 'src/app/services/dependet-dropdown.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  products: Product[] = [];

  allCity: City[] = [];
  allFacility: Facility[] = [];

  selCityId: number;

  addForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private dependetDropdown: DependetDropdownService,
    private productService: ProductService,
    private router: Router
  ) {}

  fillCity() {
    this.dependetDropdown.getAllCities().subscribe(
      (res) => {
        this.allCity = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  fillFacility() {
    this.dependetDropdown.getAllFacilities(this.selCityId).subscribe(
      (res) => {
        this.allFacility = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      duration: [null, Validators.required],
      cityId: [null],
      facilityId: [null, Validators.required],
      advancePrice: [null, Validators.required],
      installmentPrice: [null],
      installmentTotal: [null],
    });
    this.fillCity();
  }

  addProduct() {
    if (this.addForm.valid) {
      // if(typeof this.addForm.value === "object" && typeof this.addForm.value.installmentTotal !== "undefined") {
      //   delete this.addForm.value.installmentTotal
      // }

      console.log(this.addForm.value);
      this.productService.addProduct(this.addForm.value).subscribe(
        (res) => {
          alert('Kontrat paketi eklendi');
          this.addForm.reset();
          this.router.navigate(['/products']);
        },
        (err) => {
          alert('Kontrat paketi eklenirken bir hata oluştu');
        }
      );
    }
  }

  calculatePrice() {
    const duration = parseInt(this.addForm.get('duration').value || null === 0);
    const installmentPrice = parseInt(
      this.addForm.get('installmentPrice').value || null === 0
    );

    if (installmentPrice === 0) {
      return;
    }

    const installmentTotalAmount = installmentPrice * duration;

    this.addForm.get('installmentTotal').setValue(installmentTotalAmount);
  }

  get f() {
    return this.addForm.controls;
  }
}
