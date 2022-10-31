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

  updatePayment(id: any, updatePayment: Payment, file: null|File = null): Observable<Payment> {
    const { note, type } = updatePayment;

    const formData = new FormData()
    formData.append('document', file)

    return this.http.put<Payment>(`${this.apiUrl}/Payments/?id=${id}&type=${type.trim()}&note=${note}`, formData);
  }

  private handleError(error: HttpErrorResponse) {
    return throwError('Bir hata oluştu');
  }
}
