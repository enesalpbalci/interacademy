import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { Payment } from '../models/payment.interface';
@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(
    @Inject('apiUrl') private apiUrl: string,
    private http: HttpClient
  ) {}

  getAllPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.apiUrl }/Payments`);
  }

  getPaymentClaimById(id: any): Observable<Payment> {
    return this.http.get<Payment>(`${this.apiUrl}/Payments/${id}`)
  }

  updatePayment(id: any, updatePayment: Payment): Observable<Payment> {
    return this.http.put<Payment>(`${this.apiUrl}/Payments/${id}`, updatePayment);
  }

  private handleError(error: HttpErrorResponse) {
    return throwError('Bir hata oluştu');
  }
}
