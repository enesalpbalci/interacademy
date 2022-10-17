import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { PaymentDuration } from '../models/payment-duration.interface';
@Injectable({
  providedIn: 'root',
})
export class PaymentDurationService {
  constructor(
    @Inject('apiUrl') private apiUrl: string,
    private http: HttpClient
  ) {}
  
  getAllPaymentDurations(facilityId:any): Observable<PaymentDuration[]> {
    return this.http.get<PaymentDuration[]>(`${this.apiUrl}/PaymentDurations?facilityId=${facilityId}`);
  }

  addPaymentDuration(data:PaymentDuration): Observable<PaymentDuration> {
    return this.http.post<PaymentDuration>(`${this.apiUrl}/PaymentDurations`,data);
  }

  updatePaymentDuration(id:any, updatePaymentDuration:PaymentDuration) :Observable<PaymentDuration> {
    return this.http.put<PaymentDuration>(`${this.apiUrl}/PaymentDurations/${id}`, updatePaymentDuration);
  }

  removePaymentDuration(id: any) {
    return this.http.delete(`${this.apiUrl}/PaymentDurations/${id}`);
  }

  getPaymentDurationById(id: any): Observable<PaymentDuration> {
    return this.http.get<PaymentDuration>(`${this.apiUrl}/PaymentDurations/${id}`)
  }


  // private handleError(error:HttpErrorResponse){
  //   return throwError("Bir hata oluştu");
  // }
}
