import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredProfitComponent } from './pred-profit.component';

describe('PredProfitComponent', () => {
  let component: PredProfitComponent;
  let fixture: ComponentFixture<PredProfitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PredProfitComponent]
    });
    fixture = TestBed.createComponent(PredProfitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
