import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIntakeComponent } from './view-intake.component';

describe('ViewIntakeComponent', () => {
  let component: ViewIntakeComponent;
  let fixture: ComponentFixture<ViewIntakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewIntakeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewIntakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
