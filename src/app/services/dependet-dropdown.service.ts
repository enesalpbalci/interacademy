import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../models/city.interface';
import { Facility } from '../models/facility.interface';
import { Group } from '../models/group.interface';

@Injectable({
  providedIn: 'root',
})
export class DependetDropdownService {
  constructor(
    @Inject('apiUrl') private apiUrl: string,
    private http: HttpClient
  ) {}

  
  getAllCities():Observable<City[]>{
    return this.http.get<City[]>(`${this.apiUrl}/cities`)
  }

  getAllFacilities(cityId:number): Observable<Facility[]> {
    return this.http.get<Facility[]>(`${this.apiUrl}/Facilities?cityId=${cityId}`);
  }
  
  getAllGroups(facilityId:number, cityId:number): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.apiUrl}/groups?facilityId=${facilityId}&cityId=${cityId}`);
  }
}
