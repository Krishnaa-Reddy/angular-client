import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroMessageComponent } from './intro-message.component';

describe('IntroMessageComponent', () => {
  let component: IntroMessageComponent;
  let fixture: ComponentFixture<IntroMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntroMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntroMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
