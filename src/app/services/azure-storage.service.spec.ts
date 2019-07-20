import { TestBed } from '@angular/core/testing';

import { AzureStorageService } from './azure-storage.service';

describe('AzureStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AzureStorageService = TestBed.get(AzureStorageService);
    expect(service).toBeTruthy();
  });
});
