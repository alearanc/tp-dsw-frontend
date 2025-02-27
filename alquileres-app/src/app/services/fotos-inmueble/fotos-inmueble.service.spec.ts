import { TestBed } from '@angular/core/testing';

import { FotosInmuebleService } from './fotos-inmueble.service';

describe('FotosInmuebleService', () => {
  let service: FotosInmuebleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FotosInmuebleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
