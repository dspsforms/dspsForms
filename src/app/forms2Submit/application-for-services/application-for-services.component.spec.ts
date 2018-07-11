import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationForServicesComponent } from './application-for-services.component';

describe('ApplicationForServicesComponent', () => {
  let component: ApplicationForServicesComponent;
  let fixture: ComponentFixture<ApplicationForServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationForServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationForServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
