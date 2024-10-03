import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecoveryAccountPage } from './recovery-account.page';

describe('RecoveryAccountPage', () => {
  let component: RecoveryAccountPage;
  let fixture: ComponentFixture<RecoveryAccountPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoveryAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
