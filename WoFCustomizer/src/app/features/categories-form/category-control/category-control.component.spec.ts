import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryControlComponent } from './category-control.component';

describe('CategoryControlComponent', () => {
  let component: CategoryControlComponent;
  let fixture: ComponentFixture<CategoryControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
