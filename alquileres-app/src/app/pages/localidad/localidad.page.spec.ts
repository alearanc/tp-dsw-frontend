import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocalidadPage } from './localidad.page';

describe('LocalidadPage', () => {
  let component: LocalidadPage;
  let fixture: ComponentFixture<LocalidadPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalidadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
