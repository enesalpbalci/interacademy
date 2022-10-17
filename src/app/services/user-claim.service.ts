import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { UserClaim } from '../models/user-claim.interface.';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserClaimService {
  constructor(
    @Inject('apiUrl') private apiUrl: string,
    private http: HttpClient
  ) {}

  addUserClaim(data: UserClaim): Observable<UserClaim> {
    return this.http.post<UserClaim>(`${this.apiUrl}/UserClaims`, data);
  }
  getUserRoleById(id: any): Observable<UserClaim> {
    return this.http.get<UserClaim>(`${this.apiUrl}/UserClaim/s` + id);
  }
  removeUserClaim(id: any) {
    return this.http.delete(`${this.apiUrl}'/UserClaims/'${id}`);
  }
}
