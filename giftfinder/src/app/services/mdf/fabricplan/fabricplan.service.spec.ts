import { TestBed } from '@angular/core/testing';

import { FabricplanService } from './fabricplan.service';

describe('FabricplanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FabricplanService = TestBed.get(FabricplanService);
    expect(service).toBeTruthy();
  });
});
