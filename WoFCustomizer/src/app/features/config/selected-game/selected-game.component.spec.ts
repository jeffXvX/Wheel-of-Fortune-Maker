import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedGameComponent } from './selected-game.component';

describe('SelectedGameComponent', () => {
  let component: SelectedGameComponent;
  let fixture: ComponentFixture<SelectedGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
