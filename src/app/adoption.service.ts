import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Adoption } from './models/adoption.model';

@Injectable({
  providedIn: 'root'
})
export class AdoptionService {
  private apiUrl = 'http://13.60.116.120:8080/shelterb-1.0-SNAPSHOT/api/adoptions';

  constructor(private httpClient: HttpClient) { }

  createAdoption(adoption: Adoption): Observable<Adoption> {
    return this.httpClient.post<Adoption>(this.apiUrl, adoption);
  }

}
