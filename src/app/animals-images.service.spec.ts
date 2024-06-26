import { TestBed } from '@angular/core/testing';

import { AnimalsImagesService } from './animals-images.service';

describe('AnimalsImagesService', () => {
  let service: AnimalsImagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimalsImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
