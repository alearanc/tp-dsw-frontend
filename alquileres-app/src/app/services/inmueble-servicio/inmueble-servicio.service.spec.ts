import { TestBed } from '@angular/core/testing';

import { InmuebleServicioService } from './inmueble-servicio.service';

describe('InmuebleServicioService', () => {
  let service: InmuebleServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InmuebleServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
