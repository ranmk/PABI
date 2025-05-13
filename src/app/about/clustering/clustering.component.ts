import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ClusteringService} from "./services/clustering.service";

@Component({
  selector: 'app-clustering',
  templateUrl: './clustering.component.html',
  styleUrls: ['./clustering.component.scss']
})
export class ClusteringComponent {
  clusterForm: FormGroup;
  predictedCluster: number | null = null;

  constructor(private fb: FormBuilder, private clusteringService: ClusteringService) {
    this.clusterForm = this.fb.group({
      AvgPaymentDelay: [null, Validators.required],
      AvgAmountDue: [null, Validators.required],
      AvgAmountPaid: [null, Validators.required],
      AvgBalanceDue: [null, Validators.required]
    });
  }

  predict() {
    if (this.clusterForm.valid) {
      this.clusteringService.predictCluster(this.clusterForm.value).subscribe({
        next: (response) => this.predictedCluster = response.cluster,
        error: () => this.predictedCluster = null
      });
    }
  }
}
