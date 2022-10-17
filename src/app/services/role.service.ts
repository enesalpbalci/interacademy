import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, tap, throwError , catchError } from 'rxjs';
import { Role } from '../models/role.interface';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(
    @Inject('apiUrl') private apiUrl: string,
    private http: HttpClient
  ) {}

  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.apiUrl + '/roles');
  }

  addRole(data: Role): Observable<Role> {
    return this.http.post<Role>(this.apiUrl + '/roles', data);
  }

  updateRole(id: string, updateRole: Role): Observable<any> {
    return this.http.put(this.apiUrl + '/roles/' + id, updateRole);
  }

  removeRole(id: any) {
    return this.http.delete(this.apiUrl + '/roles/' + id);
  }

  getRoleById(id: any): Observable<Role> {
    return this.http.get<Role>(this.apiUrl + '/roles/' + id).pipe(
      tap((data) => console.log(data)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError('Bir hata oluştu');
  }
}
