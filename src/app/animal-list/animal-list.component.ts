import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { AnimalsService } from '../animals.service';
import { AdoptionService } from '../adoption.service';
import { MenuNavbarComponent } from '../menu-navbar/menu-navbar.component';
import { Animal } from '../models/animal.model';
import { AuthService } from '../auth.service';
import { Adoption } from '../models/adoption.model';

@Component({
  selector: 'app-animal-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MenuNavbarComponent,
    HttpClientModule,
    MatButtonModule
  ],
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.scss']
})
export class AnimalListComponent implements OnInit {
  animals: Animal[] = [];
  filteredAnimals: Animal[] = [];

  constructor(
    private animalService: AnimalsService,
    private adoptionService: AdoptionService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const type = params['type']; 
      if (type === 'CAT' || type === 'DOG') {
        this.animalService.getAnimalsBySpecies(type).subscribe({
          next: (animals) => {
            this.animals = animals;
            this.filteredAnimals = this.animals;
          },
          error: (error) => {
            console.error('There was an error!', error);
          }
        });
      } else {
        this.animalService.getAnimalsByStatus('AVAILABLE').subscribe({
          next: (animals) => {
            this.animals = animals;
            this.filteredAnimals = this.animals;
          },
          error: (error) => {
            console.error('There was an error!', error);
          }
        });
      }
    });
  }

  getImage(speciesType: string): string {
    if (speciesType === 'CAT') {
      return 'assets/cat.webp';
    } else if (speciesType === 'DOG') {
      return 'assets/dog.png';
    }
    return 'assets/default.png'; // Provide a default image for other species
  }

  adopt(animal: Animal) {
    const user = this.authService.getUserDetails();
    if (!user) {
      alert('You must be logged in to adopt an animal.');
      return;
    }

    const adoption: Adoption = {
      adoptionDate: new Date().toISOString().split('T')[0], // Current date in yyyy-mm-dd format
      user: user,
      animal: animal
    };

    this.adoptionService.createAdoption(adoption).subscribe({
      next: () => {
        alert('Adoption successful!');
        // Optionally update the UI to reflect the adoption
        animal.status.statusType = 'ADOPTED';
      },
      error: (error) => {
        console.error('Adoption failed', error);
        alert('Adoption failed. Please try again.');
      }
    });
  }

  trackByAnimalId(index: number, animal: Animal): number {
    return animal.id;
  }
}
