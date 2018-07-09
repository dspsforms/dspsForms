import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAltMediaRequestComponent } from './view-alt-media-request.component';

describe('ViewAltMediaRequestComponent', () => {
  let component: ViewAltMediaRequestComponent;
  let fixture: ComponentFixture<ViewAltMediaRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAltMediaRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAltMediaRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
