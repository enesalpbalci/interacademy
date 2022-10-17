import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Group } from '../models/group.interface';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(
    @Inject('apiUrl') private apiUrl: string,
    private http: HttpClient
  ) {}

  getAllGroup(): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.apiUrl}/groups`);
  }

  addGroup(data: Group): Observable<Group> {
    return this.http.post<Group>(`${this.apiUrl}/groups`, data);
  }

  getGroupById(id: any): Observable<Group> {
    return this.http.get<Group>(`${this.apiUrl}/groups/${id}`)
  }

  updateGroup(id: any, updateGroup: Group): Observable<Group[]> {
    return this.http.put<Group[]>(`${this.apiUrl}/groups/${id}`, updateGroup);
  }

  removeGroup(id: any){
    return this.http.delete(`${this.apiUrl}/groups/${id}`);
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error + 'Bir hata oluştu');
  }
}
