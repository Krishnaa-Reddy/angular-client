import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemContentComponent } from './problem-content.component';

describe('ProblemContentComponent', () => {
  let component: ProblemContentComponent;
  let fixture: ComponentFixture<ProblemContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProblemContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProblemContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
