import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageInmueblesPage } from './manage-inmuebles.page';

describe('ManageInmueblesPage', () => {
  let component: ManageInmueblesPage;
  let fixture: ComponentFixture<ManageInmueblesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageInmueblesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
