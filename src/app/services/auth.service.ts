import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError, catchError } from 'rxjs';
import { TokenDto, UserForLoginDto } from '../models/model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = {};
  constructor(
    private http: HttpClient,
    @Inject('apiUrl') private apiUrl: string
  ) {}
  isUserLoggedIn: boolean = false;
  errorData={};

  login(userForLoginDto:UserForLoginDto):Observable<TokenDto>{
    return this.http.post<TokenDto>(`${this.apiUrl}/users/login?userName=${userForLoginDto.userName}&passWord=${userForLoginDto.passWord}`,{})
  }

  isAuthenticated():Observable<any>{
    return this.http.get<any>(this.apiUrl+"/Facilities");
  }

   logout(): void {
      localStorage.removeItem('token');
   }
}
