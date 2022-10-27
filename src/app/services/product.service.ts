import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    @Inject('apiUrl') private apiUrl: string,
    private http: HttpClient
  ) {}
  getAllProducts(facilityId:any): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products?facilityId=${facilityId}`);
  }

  addProduct(data:Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/Products`,data);
  }

  updateProduct(id:any, updateProduct:Product) :Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/Products/${id}`, updateProduct);
  }

  removeProduct(id: any) {
    return this.http.delete(`${this.apiUrl}/Products/${id}`);
  }

  getProductById(id: any): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/Products/${id}`)
  }
}
