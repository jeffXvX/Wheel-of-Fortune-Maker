import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleInputComponent } from './puzzle-input.component';

describe('PuzzleInputComponent', () => {
  let component: PuzzleInputComponent;
  let fixture: ComponentFixture<PuzzleInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuzzleInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
