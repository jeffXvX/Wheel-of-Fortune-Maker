import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzlePreviewComponent } from './puzzle-preview.component';

describe('PuzzlePreviewComponent', () => {
  let component: PuzzlePreviewComponent;
  let fixture: ComponentFixture<PuzzlePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuzzlePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzlePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
