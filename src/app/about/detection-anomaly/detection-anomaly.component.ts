import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-detection-anomaly',
  templateUrl: './detection-anomaly.component.html',
  styleUrls: ['./detection-anomaly.component.scss']
})
export class DetectionAnomalyComponent {
  anomalyForm: FormGroup;
  anomalyResult: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient
  ) {
    this.anomalyForm = this.fb.group({
      AmountDue: [null, Validators.required],
      AmountPaid: [null, Validators.required],
      BalanceDue: [null, Validators.required],
      PaymentDelayDays: [null, Validators.required]
    });
  }

  detect() {
    if (this.anomalyForm.valid) {
      this.http.post<any>('http://localhost:5000/api/anomaly/detect', this.anomalyForm.value)
        .subscribe({
          next: (response) => this.anomalyResult = response.anomaly_status,
          error: () => this.anomalyResult = 'Error detecting anomaly.'
        });
    }
  }
}
