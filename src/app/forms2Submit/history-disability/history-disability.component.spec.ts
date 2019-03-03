import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryDisabilityComponent } from './history-disability.component';

describe('HistoryDisabilityComponent', () => {
  let component: HistoryDisabilityComponent;
  let fixture: ComponentFixture<HistoryDisabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryDisabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryDisabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
