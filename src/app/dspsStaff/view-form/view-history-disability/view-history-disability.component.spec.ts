import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHistoryDisabilityComponent } from './view-history-disability.component';

describe('ViewHistoryDisabilityComponent', () => {
  let component: ViewHistoryDisabilityComponent;
  let fixture: ComponentFixture<ViewHistoryDisabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewHistoryDisabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHistoryDisabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
