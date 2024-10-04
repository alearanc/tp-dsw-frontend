import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResultadoInmuebleComponent } from './resultado-inmueble.component';

describe('ResultadoInmuebleComponent', () => {
  let component: ResultadoInmuebleComponent;
  let fixture: ComponentFixture<ResultadoInmuebleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadoInmuebleComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResultadoInmuebleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
