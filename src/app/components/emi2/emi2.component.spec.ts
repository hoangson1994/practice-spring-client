import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Emi2Component } from './emi2.component';

describe('Emi2Component', () => {
  let component: Emi2Component;
  let fixture: ComponentFixture<Emi2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Emi2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Emi2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
