import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFormTypesComponent } from './list-form-types.component';

describe('ListFormTypesComponent', () => {
  let component: ListFormTypesComponent;
  let fixture: ComponentFixture<ListFormTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFormTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFormTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
