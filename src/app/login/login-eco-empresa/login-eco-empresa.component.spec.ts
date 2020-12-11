import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginEcoEmpresaComponent } from './login-eco-empresa.component';

describe('LoginEcoEmpresaComponent', () => {
  let component: LoginEcoEmpresaComponent;
  let fixture: ComponentFixture<LoginEcoEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginEcoEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginEcoEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
