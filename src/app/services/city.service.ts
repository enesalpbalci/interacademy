import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { City } from '../models/city.interface';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  constructor(
    @Inject('apiUrl') private apiUrl: string,
    private http: HttpClient
  ) {}

  getAllCities(): Observable<City[]> {
    return this.http.get<City[]>(`${this.apiUrl}/Cities`)
  }
}
