import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCampusBiciComponent } from './login-campus-bici.component';

describe('LoginCampusBiciComponent', () => {
  let component: LoginCampusBiciComponent;
  let fixture: ComponentFixture<LoginCampusBiciComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginCampusBiciComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginCampusBiciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
