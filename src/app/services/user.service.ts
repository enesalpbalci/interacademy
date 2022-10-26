import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, find, Observable, tap, throwError } from 'rxjs';
import { User } from '../models/user.interface';
import { decodeJwt } from '../helper/decode.jwt.helper';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    @Inject('apiUrl') private apiUrl: string,
    private http: HttpClient
  ) {}

  getAllUsers(): Observable<User[]> {
    let claims = JSON.parse(
      decodeJwt(localStorage.getItem('token')?.split('.')[1])
    );
    let role = claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    return this.http.get<User[]>(`${this.apiUrl}/users?role=${role}`);
  }

  getAllUsersByRole(roleName: string) {
    return this.http.get<User[]>(`${this.apiUrl}/users?role=${roleName}`);
  }

  addUser(passWord: string, roleName: string, data: User): Observable<User> {
    return this.http.post<User>(
      `${this.apiUrl}/users?rolename=${roleName}&passWord=${passWord}`,
      data
    );
  }

  addStudent(passWord: string,roleName:string = "Student", data: User): Observable<User> {
    return this.http.post<User>(
      `${this.apiUrl}/users?rolename=${roleName}&passWord=${passWord}`,
      data
    );
  }

  updateUser(id: any, updateUser: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${id}`, updateUser);
  }

  removeUser(id: any) {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }

  getUserById(id: any): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error.error + ':::' + 'Bir hata oluştu');
  }
}
