import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficasCampusBiciComponent } from './graficas-campus-bici.component';

describe('GraficasCampusBiciComponent', () => {
  let component: GraficasCampusBiciComponent;
  let fixture: ComponentFixture<GraficasCampusBiciComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficasCampusBiciComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficasCampusBiciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
