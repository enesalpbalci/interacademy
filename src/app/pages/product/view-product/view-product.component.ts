import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  product:Product

  constructor(private activadetRoute:ActivatedRoute, private productService:ProductService) { }

  ngOnInit(): void {
    this.activadetRoute.params.subscribe((params) => {
      this.productService
        .getProductById(params['id'])
        .subscribe((data) => {
          this.product = data;
        });
    });
  }

  removeProduct(id: any) {
    if (confirm('Silmek istediğinize emin misiniz?')) {
      this.productService.removeProduct(id).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

}
