import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetectionAnomalyComponent } from './detection-anomaly.component';

describe('DetectionAnomalyComponent', () => {
  let component: DetectionAnomalyComponent;
  let fixture: ComponentFixture<DetectionAnomalyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetectionAnomalyComponent]
    });
    fixture = TestBed.createComponent(DetectionAnomalyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
