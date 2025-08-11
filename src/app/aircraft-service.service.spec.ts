import { TestBed } from '@angular/core/testing';

import { AircraftServiceService } from './aircraft-service.service';

describe('AircraftServiceService', () => {
  let service: AircraftServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AircraftServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
