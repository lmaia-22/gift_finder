import { TestBed } from '@angular/core/testing';

import { ProductlineService } from './productline.service';

describe('ProductlineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductlineService = TestBed.get(ProductlineService);
    expect(service).toBeTruthy();
  });
});
