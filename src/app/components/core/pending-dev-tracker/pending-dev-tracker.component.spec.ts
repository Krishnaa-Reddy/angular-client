import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingDevTrackerComponent } from './pending-dev-tracker.component';

describe('PendingDevTrackerComponent', () => {
  let component: PendingDevTrackerComponent;
  let fixture: ComponentFixture<PendingDevTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingDevTrackerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingDevTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
