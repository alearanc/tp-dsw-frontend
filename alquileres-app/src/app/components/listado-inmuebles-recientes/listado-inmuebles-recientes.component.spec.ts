import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ListadoInmueblesRecientesComponent } from './listado-inmuebles-recientes.component';
import { InmuebleService } from 'src/app/services/inmueble/inmueble.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { of } from 'rxjs';
import { Inmueble } from 'src/app/models/Inmueble';

describe('ListadoInmueblesRecientesComponent', () => {
  let component: ListadoInmueblesRecientesComponent;
  let fixture: ComponentFixture<ListadoInmueblesRecientesComponent>;
  let authService: AuthService;
  let inmuebleService: InmuebleService;

  // Datos simulados
  const localidad = {
    cod_postal: 2000,
    nombre: 'Rosario',
  };
  const tipoInmueble = {
    id_tipoinmueble: 1,
    descripcion: 'Casa'
  };
  const mockInmuebles: Inmueble[] = [
    {
      id_inmueble: 1,
      titulo_inmueble: 'Casita en la playa',
      descripcion_inmueble: 'Pequeña casita en la costa',
      precio_noche: 50,
      direccion_inmueble: 'Calle Falsa 123',
      capacidad: 2,
      tipo_inmueble: tipoInmueble,
      localidad: localidad,
      propietario: 1,
      habilitado: true,
      id_propietario: 1,
      puntuacion_promedio: 3.5
    },
    {
      id_inmueble: 2,
      titulo_inmueble: 'Departamento céntrico',
      descripcion_inmueble: 'Departamento en pleno centro',
      precio_noche: 70,
      direccion_inmueble: 'Calle Real 456',
      capacidad: 4,
      tipo_inmueble: tipoInmueble,
      localidad: localidad,
      propietario: 2,
      habilitado: true,
      id_propietario: 2,
      puntuacion_promedio: 4.5
    }
  ];

  beforeEach(async () => {
    // Mocks base de los servicios
    const authServiceMock = {
      isAuthenticated: jasmine.createSpy('isAuthenticated'),
      getAuthState: () => of(true)
    };
    const inmuebleServiceMock = {
      getInmueblesSinReservas: jasmine.createSpy('getInmueblesSinReservas'),
      getAllInmuebles: jasmine.createSpy('getAllInmuebles')
    };

    await TestBed.configureTestingModule({
      declarations: [ListadoInmueblesRecientesComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AuthService, useValue: authServiceMock },
        { provide: InmuebleService, useValue: inmuebleServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoInmueblesRecientesComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    inmuebleService = TestBed.inject(InmuebleService);
  });

  beforeEach(() => {
    // Reseteamos los espías antes de cada prueba
    (authService.isAuthenticated as jasmine.Spy).calls.reset();
    (inmuebleService.getInmueblesSinReservas as jasmine.Spy).calls.reset();
    (inmuebleService.getAllInmuebles as jasmine.Spy).calls.reset();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar los inmuebles sin reservas cuando el usuario está autenticado', () => {
    (authService.isAuthenticated as jasmine.Spy).and.returnValue(true);
    (inmuebleService.getInmueblesSinReservas as jasmine.Spy).and.returnValue(of(mockInmuebles));

    fixture.detectChanges();

    expect(inmuebleService.getInmueblesSinReservas).toHaveBeenCalled();
    expect(inmuebleService.getAllInmuebles).not.toHaveBeenCalled();
    expect(component.inmuebles).toEqual(mockInmuebles);
    expect(component.sinResultados).toBeFalse();
  });

  it('debería cargar todos los inmuebles cuando el usuario no está autenticado', () => {
    (authService.isAuthenticated as jasmine.Spy).and.returnValue(false);
    (inmuebleService.getAllInmuebles as jasmine.Spy).and.returnValue(of(mockInmuebles));

    fixture.detectChanges();

    expect(inmuebleService.getInmueblesSinReservas).not.toHaveBeenCalled();
    expect(inmuebleService.getAllInmuebles).toHaveBeenCalled();
    expect(component.inmuebles).toEqual(mockInmuebles);
    expect(component.sinResultados).toBeFalse();
  });

  it('debería establecer sinResultados en verdadero cuando no se devuelven inmuebles (usuario autenticado)', () => {
    (authService.isAuthenticated as jasmine.Spy).and.returnValue(true);
    (inmuebleService.getInmueblesSinReservas as jasmine.Spy).and.returnValue(of([]));

    fixture.detectChanges();

    expect(inmuebleService.getInmueblesSinReservas).toHaveBeenCalled();
    expect(inmuebleService.getAllInmuebles).not.toHaveBeenCalled();
    expect(component.inmuebles).toEqual([]);
    expect(component.sinResultados).toBeTrue();
  });

  it('debería establecer sinResultados en verdadero cuando no se devuelven inmuebles (usuario no autenticado)', () => {
    (authService.isAuthenticated as jasmine.Spy).and.returnValue(false);
    (inmuebleService.getAllInmuebles as jasmine.Spy).and.returnValue(of([]));

    fixture.detectChanges();

    expect(inmuebleService.getInmueblesSinReservas).not.toHaveBeenCalled();
    expect(inmuebleService.getAllInmuebles).toHaveBeenCalled();
    expect(component.inmuebles).toEqual([]);
    expect(component.sinResultados).toBeTrue();
  });
});

/*
  Las 5 pruebas actuales cubren:

  - Creación componente.
  - Carga de inmuebles cuando user está autenticado (con datos).
  - Carga de inmuebles cuando user no está autenticado (con datos).
  - Caso de lista vacía cuando user está autenticado.
  - Caso de lista vacía cuando user no está autenticado.
*/