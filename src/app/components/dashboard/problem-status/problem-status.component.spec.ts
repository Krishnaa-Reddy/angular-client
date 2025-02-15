import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemStatusComponent } from './problem-status.component';

describe('ProblemStatusComponent', () => {
  let component: ProblemStatusComponent;
  let fixture: ComponentFixture<ProblemStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProblemStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProblemStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
