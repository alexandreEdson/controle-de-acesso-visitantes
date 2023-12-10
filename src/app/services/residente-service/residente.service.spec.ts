import { TestBed } from '@angular/core/testing';

import { ResidenteService } from './residente.service';

describe('ResidenteService', () => {
  let service: ResidenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResidenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
