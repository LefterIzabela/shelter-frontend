import { Injectable } from '@angular/core';
import { AnimalType } from './models/animal-type.enum';

@Injectable({
  providedIn: 'root'
})
export class AnimalsImagesService {

  private catImages: string[] = [
    'assets/cats/cat1.jpg',
    'assets/cats/cat2.jpg',
    'assets/cats/cat3.jpg',
    'assets/cats/cat4.jpg',
    'assets/cats/cat5.jpg'
    // Add more image paths here
  ];

  private dogImages: string[] = [
    'assets/dogs/dog1.jpg',
    'assets/dogs/dog2.jpg',
    'assets/dogs/dog3.jpg',
    // Add more image paths here
  ];

  private otherImages: string[] = [
    'assets/other/fish.jpg',
    // Add more image paths here
  ];


  assignImage(animalType: AnimalType){
    if(animalType == AnimalType.CAT)
      {
        const randomIndex = Math.floor(Math.random() * this.catImages.length);
        return this.catImages[randomIndex];
      }

    if(animalType == AnimalType.DOG)
      {
        const randomIndex = Math.floor(Math.random() * this.dogImages.length);
        return this.dogImages[randomIndex];
      }

      const randomIndex = Math.floor(Math.random() * this.otherImages.length);
      return this.otherImages[randomIndex];
  }
  constructor() { }
}
