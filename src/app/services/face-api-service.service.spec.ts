import { TestBed } from '@angular/core/testing';

import { FaceApiServiceService } from './face-api-service.service';

describe('FaceApiServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FaceApiServiceService = TestBed.get(FaceApiServiceService);
    expect(service).toBeTruthy();
  });
});
