import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkArchiveComponent } from './mark-archive.component';

describe('MarkArchiveComponent', () => {
  let component: MarkArchiveComponent;
  let fixture: ComponentFixture<MarkArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
