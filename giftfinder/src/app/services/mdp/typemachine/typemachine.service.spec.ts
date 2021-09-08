import { TestBed } from '@angular/core/testing';

import { TypemachineService } from './typemachine.service';

describe('TypemachineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypemachineService = TestBed.get(TypemachineService);
    expect(service).toBeTruthy();
  });
});
