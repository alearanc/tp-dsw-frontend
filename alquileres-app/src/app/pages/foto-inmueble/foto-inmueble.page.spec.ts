import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FotoInmueblePage } from './foto-inmueble.page';

describe('FotoInmueblePage', () => {
  let component: FotoInmueblePage;
  let fixture: ComponentFixture<FotoInmueblePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FotoInmueblePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
