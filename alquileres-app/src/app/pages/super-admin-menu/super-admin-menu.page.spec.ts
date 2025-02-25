import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuperAdminMenuPage } from './super-admin-menu.page';

describe('SuperAdminMenuPage', () => {
  let component: SuperAdminMenuPage;
  let fixture: ComponentFixture<SuperAdminMenuPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperAdminMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
