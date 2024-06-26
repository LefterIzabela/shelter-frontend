import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Animal } from './models/animal.model';

@Injectable({
  providedIn: 'root'
})
export class AnimalsService {

  private apiUrl = 'http://13.60.116.120:8080/shelterb-1.0-SNAPSHOT/api/animals'; // Adjusted API URL

  constructor(private httpClient: HttpClient) { }

  getAllAnimals(): Observable<Animal[]> {
    return this.httpClient.get<any[]>(this.apiUrl).pipe(
      map(response => response.map(body => this.transformToAnimal(body)))
    );
  }

  getAnimalById(id: string): Observable<Animal> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<any>(url).pipe(
      map(body => this.transformToAnimal(body))
    );
  }

  getAnimalsBySpecies(speciesType: string): Observable<Animal[]> {
    const url = `${this.apiUrl}/species/${speciesType.toUpperCase()}`;
    return this.httpClient.get<any[]>(url).pipe(
      map(response => response.map(body => this.transformToAnimal(body)))
    );
  }

  getAnimalsByStatus(statusType: string): Observable<Animal[]> {
    const url = `${this.apiUrl}/status/${statusType.toUpperCase()}`;
    return this.httpClient.get<any[]>(url).pipe(
      map(response => response.map(body => this.transformToAnimal(body)))
    );
  }

  private transformToAnimal(body: any): Animal {
    return {
      id: body.id,
      name: body.name,
      age: body.age,
      species: body.species,
      dateOfRegistration: body.dateOfRegistration,
      status: body.status
    } as Animal;
  }
}
