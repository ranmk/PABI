import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment-delay',
  templateUrl: './payment-delay.component.html',
  styleUrls: ['./payment-delay.component.scss']
})
export class PaymentDelayComponent {
  paymentForm: FormGroup;
  predictedDelay: number | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.paymentForm = this.fb.group({
      Price: [null, Validators.required],
      Amount: [null, Validators.required],
      DiscountOffered: [null, Validators.required],
      RecommendedProfitMargin: [null, Validators.required]
    });
  }

  predict() {
    if (this.paymentForm.valid) {
      this.http.post<any>('http://localhost:5000/api/payment-delay/predict', this.paymentForm.value)
        .subscribe({
          next: (response) => this.predictedDelay = response.predicted_delay_days,
          error: () => this.predictedDelay = null
        });
    }
  }
}
