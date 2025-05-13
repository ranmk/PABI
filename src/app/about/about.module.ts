import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { AboutComponent } from "./about.component";
import { ClassificationComponent } from './classification/classification.component';
import { ClusteringComponent } from './clustering/clustering.component';
import { DetectionAnomalyComponent } from './detection-anomaly/detection-anomaly.component';
import { MarginComponent } from './margin/margin.component';
import { PaymentDelayComponent } from './payment-delay/payment-delay.component';
import { PredProfitComponent } from './pred-profit/pred-profit.component';
import { RegressionComponent } from './regression/regression.component';

const routes: Routes = [
  {
    path: "",
    component: AboutComponent,
    data: {
      title: "About",
      urls: [{ title: "About", url: "/about" }, { title: "About" }],
    },
    children: [
      { path: "classification", component: ClassificationComponent },
      { path: "clustering", component: ClusteringComponent },
      { path: "detection-anomaly", component: DetectionAnomalyComponent },
      { path: "margin", component: MarginComponent },
      { path: "payment-delay", component: PaymentDelayComponent },
      { path: "pred-profit", component: PredProfitComponent },
      { path: "regression", component: RegressionComponent },
    ],
  },
];


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    AboutComponent, // ✅ Add this missing declaration!
    ClassificationComponent,
    ClusteringComponent,
    DetectionAnomalyComponent,
    MarginComponent,
    PaymentDelayComponent,
    PredProfitComponent,
    RegressionComponent
  ],
})
export class AboutModule {}

