import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, tap, throwError, catchError } from 'rxjs';
import { RoleClaim } from '../models/role-claim.interface';

@Injectable({
  providedIn: 'root',
})
export class RoleClaimService {
  constructor(
    @Inject('apiUrl') private apiUrl: string,
    private http: HttpClient
  ) {}

  addRoleClaim(data: RoleClaim): Observable<RoleClaim> {
    return this.http.post<RoleClaim>(this.apiUrl + '/RoleClaims', data);
  }
  removeRoleClaim(id: any) {
    return this.http.delete(this.apiUrl + '/RoleClaims/' + id);
  }

  getRoleClaimById(id: any): Observable<RoleClaim> {
    return this.http.get<RoleClaim>(this.apiUrl + '/RoleClaims/' + id)
  }
}
