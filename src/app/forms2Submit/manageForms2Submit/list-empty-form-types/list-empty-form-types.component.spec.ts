import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEmptyFormTypesComponent } from './list-empty-form-types.component';

describe('ListEmptyFormTypesComponent', () => {
  let component: ListEmptyFormTypesComponent;
  let fixture: ComponentFixture<ListEmptyFormTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEmptyFormTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEmptyFormTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
