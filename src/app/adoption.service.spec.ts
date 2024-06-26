import { TestBed } from '@angular/core/testing';

import { AdoptService } from './adoption.service';

describe('AdoptService', () => {
  let service: AdoptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdoptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
