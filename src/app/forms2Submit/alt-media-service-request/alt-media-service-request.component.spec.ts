import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltMediaServiceRequestComponent } from './alt-media-service-request.component';

describe('AltMediaServiceRequestComponent', () => {
  let component: AltMediaServiceRequestComponent;
  let fixture: ComponentFixture<AltMediaServiceRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltMediaServiceRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltMediaServiceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
