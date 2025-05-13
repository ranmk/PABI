import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ClassificationService} from "./services/classification.service";

@Component({
  selector: 'app-classification',
  templateUrl: './classification.component.html',
  styleUrls: ['./classification.component.scss']
})
export class ClassificationComponent {
  riskForm: FormGroup;
  predictedRisk: string | null = null;

  constructor(
    private fb: FormBuilder,
    private classificationService: ClassificationService
  ) {
    this.riskForm = this.fb.group({
      AmountPaid: [null, Validators.required],
      BalanceDue: [null, Validators.required],
      TotalAssets: [null, Validators.required],
      TotalLiabilities: [null, Validators.required],
      Equity: [null, Validators.required],
      ActualExpenses: [null, Validators.required],
      Budget: [null, Validators.required],
      Fk_Supplier: [null, Validators.required],
      Fk_Date: [null, Validators.required],
      Fk_Grand_Livre: [null, Validators.required],
      DisputeStatus_Ouvert: [0, Validators.required]  // 0 or 1
    });
  }

  predict() {
    if (this.riskForm.valid) {
      this.classificationService.predictRisk(this.riskForm.value).subscribe({
        next: (response) => {
          this.predictedRisk = response.predicted_risk;
        },
        error: (error) => {
          console.error('Prediction Failed:', error);
          this.predictedRisk = 'Error occurred.';
        }
      });
    } else {
      this.predictedRisk = 'Please fill all required fields.';
    }
  }
}
