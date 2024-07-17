import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TipoInmueblePage } from './tipo-inmueble.page';

describe('TipoInmueblePage', () => {
  let component: TipoInmueblePage;
  let fixture: ComponentFixture<TipoInmueblePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoInmueblePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
