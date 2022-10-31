import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { City } from 'src/app/models/city.interface';
import { Facility } from 'src/app/models/facility.interface';
import { Product } from 'src/app/models/product.interface';
import { DependetDropdownService } from 'src/app/services/dependet-dropdown.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css'],
})
export class ListProductComponent implements OnInit {
  allCities: City[] = [];
  allFacilities: Facility[] = [];
  allProducts: Product[] = [];

  hide: boolean = false;

  listForm: FormGroup;

  selCityId: number;
  selFacilityId: number;

  dtOptions: any = {};
  dtTrigger: Subject<void> = new Subject<void>();

  constructor(
    private productService: ProductService,
    private dependetDropdown: DependetDropdownService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      language: {
        url: '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Turkish.json',
      },
      dom: 'Bfrtip',
      buttons: [
        // {
        //   text: 'Kontrat Paketi Ekle',
        //   action: (): void => {
        //     this.router.navigate(['/products/add']);
        //   },
        //   className: 'btn btn-info',
        // },
        'excel',
        'pdfHtml5',
        'print',
      ],
      responsive: true,
      lengthMenu: [5, 15, 25],
      destroy: true,
    };
    this.listForm = this.formBuilder.group({
      name: [],
      duration: [],
      cityId: [],
      facilityId: [],
      advancePrice: [],
      installmentPrice: [],
      installmentTotal: [],
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

  fillListProducts() {
    this.productService.getAllProducts(this.selFacilityId).subscribe(
      (res) => {
        this.allProducts = res;
        this.dtTrigger.next();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  removeProduct(id: any) {
    if (confirm('Silmek istediğinize emin misiniz?')) {
      this.productService.removeProduct(id).subscribe(
        (res) => {
          this.productService.getAllProducts(id);
          this.fillListProducts();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  // showTable: boolean = false;
  // toggleShowTable(): void {
  //   this.showTable = !this.showTable;
  //   this.fillListProducts();
  // }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
