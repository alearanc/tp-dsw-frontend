import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CEInmueblePage } from './ce-inmueble.page';

describe('CEInmueblePage', () => {
  let component: CEInmueblePage;
  let fixture: ComponentFixture<CEInmueblePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CEInmueblePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
