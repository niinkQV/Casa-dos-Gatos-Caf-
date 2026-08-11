import { TestBed } from '@angular/core/testing';

import { Gato } from './gato';

describe('Gato', () => {
  let service: Gato;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Gato);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
