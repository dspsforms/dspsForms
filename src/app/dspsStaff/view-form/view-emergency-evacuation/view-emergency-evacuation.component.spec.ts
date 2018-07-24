import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmergencyEvacuationComponent } from './view-emergency-evacuation.component';

describe('ViewEmergencyEvacuationComponent', () => {
  let component: ViewEmergencyEvacuationComponent;
  let fixture: ComponentFixture<ViewEmergencyEvacuationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEmergencyEvacuationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEmergencyEvacuationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
