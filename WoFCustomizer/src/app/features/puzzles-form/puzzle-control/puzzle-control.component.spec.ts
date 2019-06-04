import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleControlComponent } from './puzzle-control.component';

describe('PuzzleControlComponent', () => {
  let component: PuzzleControlComponent;
  let fixture: ComponentFixture<PuzzleControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuzzleControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
