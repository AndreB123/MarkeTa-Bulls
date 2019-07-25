import { TestBed } from '@angular/core/testing';

import { PortfolioService } from './portfolio.service';

describe('PortfolioServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PortfolioService = TestBed.get(PortfolioService);
    expect(service).toBeTruthy();
  });
});
