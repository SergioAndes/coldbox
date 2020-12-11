import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginBiciUsuarioComponent } from './login-bici-usuario.component';

describe('LoginBiciUsuarioComponent', () => {
  let component: LoginBiciUsuarioComponent;
  let fixture: ComponentFixture<LoginBiciUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginBiciUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginBiciUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
