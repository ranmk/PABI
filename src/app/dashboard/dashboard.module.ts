import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { NgApexchartsModule } from "ng-apexcharts";
import { DashboardComponent } from "./dashboard.component";
import { SalesSummaryComponent } from "./dashboard-components/sales-summary/sales-summary.component";
import { FeedsComponent } from "./dashboard-components/feeds/feeds.component";
import { TopSellingComponent } from "./dashboard-components/top-selling/top-selling.component";
import { TopCardsComponent } from "./dashboard-components/top-cards/top-cards.component";
import { BlogCardsComponent } from "./dashboard-components/blog-cards/blog-cards.component";
import { OverviewComponent } from './overview/overview.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { FinanceComponent } from './finance/finance.component';
import { InsightsComponent } from './purchase/insights/insights.component';
import { VisualisationComponent } from './finance/visualisation/visualisation.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },  // Main dashboard landing page
  { path: 'overview', component: OverviewComponent },
  { path: 'purchase', component: PurchaseComponent },
  { path: 'finance', component: FinanceComponent },
  { path: 'purchase/insights', component: InsightsComponent },
  { path: 'finance/visualisation', component: VisualisationComponent },

];


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    NgApexchartsModule,
  ],
  declarations: [
    DashboardComponent,
    SalesSummaryComponent,
    FeedsComponent,
    TopSellingComponent,
    TopCardsComponent,
    BlogCardsComponent,
    OverviewComponent,
    PurchaseComponent,
    FinanceComponent,
    InsightsComponent,
    VisualisationComponent
  ],
})
export class DashboardModule {}
