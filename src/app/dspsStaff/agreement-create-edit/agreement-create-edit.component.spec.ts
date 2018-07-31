import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementCreateEditComponent } from './agreement-create-edit.component';

describe('AgreementCreateEditComponent', () => {
  let component: AgreementCreateEditComponent;
  let fixture: ComponentFixture<AgreementCreateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgreementCreateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
