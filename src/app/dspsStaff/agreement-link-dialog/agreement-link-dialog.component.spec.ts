import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementLinkDialogComponent } from './agreement-link-dialog.component';

describe('AgreementLinkDialogComponent', () => {
  let component: AgreementLinkDialogComponent;
  let fixture: ComponentFixture<AgreementLinkDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgreementLinkDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementLinkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
