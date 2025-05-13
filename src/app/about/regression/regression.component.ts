import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-regression',
  templateUrl: './regression.component.html',
  styleUrls: ['./regression.component.scss']
})
export class RegressionComponent {
  regressionForm: FormGroup;
  predictedAmountDue: number | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.regressionForm = this.fb.group({
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
      DisputeStatus_Ouvert: [null, Validators.required]
    });
  }

  predict() {
    if (this.regressionForm.valid) {
      this.http.post<any>('http://localhost:5000/api/regression/predict', this.regressionForm.value)
        .subscribe({
          next: (response) => this.predictedAmountDue = response.predicted_amount_due,
          error: () => this.predictedAmountDue = null
        });
    }
  }
}
