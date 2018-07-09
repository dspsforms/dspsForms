import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntakeInterviewFormComponent } from './intake-interview-form.component';

describe('IntakeInterviewFormComponent', () => {
  let component: IntakeInterviewFormComponent;
  let fixture: ComponentFixture<IntakeInterviewFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntakeInterviewFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntakeInterviewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
