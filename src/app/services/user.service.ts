import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, find, Observable, tap, throwError } from 'rxjs';
import { User } from '../models/user.interface';
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
      this.decodeBase64(localStorage.getItem('token')?.split('.')[1])
    );
    return this.http.get<User[]>(`${this.apiUrl}/users?role=Administrator`);
  }

  addUser(passWord: string, roleName: string, data: User): Observable<User> {
    return this.http.post<User>(
      `${this.apiUrl}/users?rolename=Administrator&passWord=${passWord}`,
      data
    );
  }

  addStudent(passWord: string, roleName: string, data: User): Observable<User> {
    return this.http.post<User>(
      `${this.apiUrl}/users?rolename=Student&passWord=${passWord}`,
      data
    );
  }

  updateUser(id: any, updateUser: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${id}`, updateUser);
  }

  removeUser(id: any) {
    return this.http.delete(`${this.apiUrl}'/users/'${id}`);
  }

  getUserById(id: any): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error.error + ':::' + 'Bir hata oluştu');
  }

  private decodeBase64(s: any): any {
    var e = {},
      i,
      b = 0,
      c,
      x,
      l = 0,
      a,
      r = '',
      w = String.fromCharCode,
      L = s.length;
    var A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    for (i = 0; i < 64; i++) {
      e[A.charAt(i)] = i;
    }
    for (x = 0; x < L; x++) {
      c = e[s.charAt(x)];
      b = (b << 6) + c;
      l += 6;
      while (l >= 8) {
        ((a = (b >>> (l -= 8)) & 0xff) || x < L - 2) && (r += w(a));
      }
    }
    return r;
  }
}
