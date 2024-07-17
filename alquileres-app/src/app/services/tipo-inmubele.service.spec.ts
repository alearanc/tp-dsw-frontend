import { TestBed } from '@angular/core/testing';

import { TipoInmubeleService } from './tipo-inmubele.service';

describe('TipoInmubeleService', () => {
  let service: TipoInmubeleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoInmubeleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
