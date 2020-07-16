import { TestBed } from '@angular/core/testing';

import { TshirtService } from './tshirt.service';

describe('TshirtService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TshirtService = TestBed.get(TshirtService);
    expect(service).toBeTruthy();
  });
});
