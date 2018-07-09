import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewApplicationForServicesComponent } from './view-application-for-services.component';

describe('ViewApplicationForServicesComponent', () => {
  let component: ViewApplicationForServicesComponent;
  let fixture: ComponentFixture<ViewApplicationForServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewApplicationForServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewApplicationForServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
