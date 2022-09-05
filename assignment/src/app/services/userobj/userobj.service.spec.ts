import { TestBed } from '@angular/core/testing';

import { UserobjService } from './userobj.service';

describe('UserobjService', () => {
  let service: UserobjService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserobjService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
