import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-pred-profit',
  templateUrl: './pred-profit.component.html',
  styleUrls: ['./pred-profit.component.scss']
})
export class PredProfitComponent {
  profitForm: FormGroup;
  predictedProfit: number | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.profitForm = this.fb.group({
      Price: [null, Validators.required],
      Amount: [null, Validators.required],
      DiscountOffered: [null, Validators.required],
      RecommendedProfitMargin: [null, Validators.required],
      TotalAssets: [null, Validators.required],
      TotalLiabilities: [null, Validators.required],
      Equity: [null, Validators.required],
      AmountDue: [null, Validators.required],
      AmountPaid: [null, Validators.required],
      BalanceDue: [null, Validators.required]
    });
  }

  predict() {
    if (this.profitForm.valid) {
      this.http.post<any>('http://localhost:5000/api/profit/predict', this.profitForm.value)
        .subscribe({
          next: (response) => this.predictedProfit = response.predicted_profit,
          error: () => this.predictedProfit = null
        });
    }
  }
}
