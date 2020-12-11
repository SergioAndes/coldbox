import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficasEcoEmpresaComponent } from './graficas-eco-empresa.component';

describe('GraficasEcoEmpresaComponent', () => {
  let component: GraficasEcoEmpresaComponent;
  let fixture: ComponentFixture<GraficasEcoEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficasEcoEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficasEcoEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
