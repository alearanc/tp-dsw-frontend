import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InmuebleDetailsPage } from './inmueble-details.page';

describe('InmuebleDetailsPage', () => {
  let component: InmuebleDetailsPage;
  let fixture: ComponentFixture<InmuebleDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InmuebleDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
