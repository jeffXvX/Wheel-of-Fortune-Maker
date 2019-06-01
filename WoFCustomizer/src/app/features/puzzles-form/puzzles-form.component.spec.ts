import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzlesFormComponent } from './puzzles-form.component';

describe('PuzzlesFormComponent', () => {
  let component: PuzzlesFormComponent;
  let fixture: ComponentFixture<PuzzlesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuzzlesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzlesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
