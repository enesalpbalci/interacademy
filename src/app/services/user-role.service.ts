import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { UserRoles } from '../models/user-roles.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserRoleService {
  constructor(
    @Inject('apiUrl') private apiUrl: string,
    private http: HttpClient
  ) {}

  addUserRole(data:UserRoles): Observable<UserRoles> {
    return this.http.post<UserRoles>(`${this.apiUrl}/userroles`,data);
  }
  getUserRoleById(id: any): Observable<UserRoles> {
    return this.http.get<UserRoles>(`${this.apiUrl}/userroles/` + id);
  }
  removeUserRole(id: any) {
    return this.http.delete(`${this.apiUrl}'/userroles/'${id}`);
  }
}
