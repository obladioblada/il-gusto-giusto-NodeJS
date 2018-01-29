import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VassoioFormComponent } from './vassoio-form.component';

describe('VassoioFormComponent', () => {
  let component: VassoioFormComponent;
  let fixture: ComponentFixture<VassoioFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VassoioFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VassoioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
