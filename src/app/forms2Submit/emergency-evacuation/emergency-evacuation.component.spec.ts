import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyEvacuationComponent } from './emergency-evacuation.component';

describe('EmergencyEvacuationComponent', () => {
  let component: EmergencyEvacuationComponent;
  let fixture: ComponentFixture<EmergencyEvacuationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmergencyEvacuationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencyEvacuationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
