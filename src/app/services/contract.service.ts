import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Contract } from '../models/contract.interface';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  constructor(
    @Inject('apiUrl') private apiUrl: string,
    private http: HttpClient
  ) {}
  getAllContract(): Observable<Contract[]> {
    return this.http.get<Contract[]>(`${this.apiUrl}/Contracts`);
  }

  addContract(data: Contract): Observable<Contract[]> {
    return this.http.post<Contract[]>(`${this.apiUrl}/Contracts`, data);
  }

  getContractById(id: any): Observable<Contract> {
    return this.http.get<Contract>(`${this.apiUrl}/Contracts/${id}`);
  }

  updateContract(id: any, updateContract: Contract, approved:boolean): Observable<Contract[]> {
    return this.http.put<Contract[]>(
      `${this.apiUrl}/Contracts/${id}?approved=${approved}`,
      updateContract
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error + 'Bir hata oluştu');
  }
}
