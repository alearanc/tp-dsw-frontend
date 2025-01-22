import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListadoInmueblesRecientesComponent } from './listado-inmuebles-recientes.component';

describe('ListadoInmueblesRecientesComponent', () => {
  let component: ListadoInmueblesRecientesComponent;
  let fixture: ComponentFixture<ListadoInmueblesRecientesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoInmueblesRecientesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoInmueblesRecientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
