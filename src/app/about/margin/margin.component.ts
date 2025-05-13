import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-margin',
  templateUrl: './margin.component.html',
  styleUrls: ['./margin.component.scss']
})
export class MarginComponent {
  marginForm: FormGroup;
  predictedMargin: number | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    // Dynamically generate form based on feature columns if needed
    this.marginForm = this.fb.group({
      Feature1: [null, Validators.required],
      Feature2: [null, Validators.required],
      // Add all required feature controls here based on feature_columns
    });
  }

  predict() {
    if (this.marginForm.valid) {
      this.http.post<any>('http://localhost:5000/api/margin/predict', this.marginForm.value)
        .subscribe({
          next: (response) => this.predictedMargin = response.predicted_margin,
          error: () => this.predictedMargin = null
        });
    }
  }
}
