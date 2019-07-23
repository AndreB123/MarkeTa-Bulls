import { TestBed } from '@angular/core/testing';

import { IEXService } from './iex.service';

describe('IEXService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IEXService = TestBed.get(IEXService);
    expect(service).toBeTruthy();
  });
});
