import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleScreenTextComponent } from './title-screen-text.component';

describe('TitleScreenTextComponent', () => {
  let component: TitleScreenTextComponent;
  let fixture: ComponentFixture<TitleScreenTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleScreenTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleScreenTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
