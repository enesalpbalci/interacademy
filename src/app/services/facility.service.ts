import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Facility } from '../models/facility.interface';

@Injectable({
  providedIn: 'root',
})
export class FacilityService {
  constructor(
    @Inject('apiUrl') private apiUrl: string,
    private http: HttpClient
  ) {}
  getAllFacility(): Observable<Facility[]> {
    return this.http.get<Facility[]>(`${this.apiUrl}/Facilities?cityId=1`);
  }

  addFacility(data: Facility): Observable<Facility> {
    return this.http.post<Facility>(this.apiUrl + '/Facilities', data);
  }

  getFacilityById(id: any): Observable<Facility> {
    return this.http.get<Facility>(this.apiUrl + '/Facilities/' + id);
  }

  updateFacility(id: any, updateFacility: Facility): Observable<Facility[]> {
    console.log(id);
    return this.http.put<Facility[]>(
      this.apiUrl + '/Facilities/' + id,
      updateFacility
    );
  }

  removeFacility(id: any) {
    return this.http.delete(this.apiUrl + '/facilities/' + id);
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error + 'Bir hata oluştu');
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
