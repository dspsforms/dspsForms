import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementViewDialogComponent } from './agreement-view-dialog.component';

describe('AgreementViewDialogComponent', () => {
  let component: AgreementViewDialogComponent;
  let fixture: ComponentFixture<AgreementViewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgreementViewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
