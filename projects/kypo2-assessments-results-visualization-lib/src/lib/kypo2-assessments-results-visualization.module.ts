import { NgModule } from '@angular/core';
import { Kypo2AssessmentsResultsComponent } from './kypo2-assessments-results.component';
import { FFQResultsComponent } from './component/ffq-results/ffq-results.component';
import { MCQResultsComponent } from './component/mcq-results/mcq-results.component';
import { EMIResultsComponent } from './component/emi-results/emi-results.component';
import { AssessmentVisualizationComponent } from './component/assessment-visualization/assessment-visualization.component';
import { CommonModule } from '@angular/common';
import { MCQChartComponent } from './component/mcq-results/mcq-chart/mcq-chart.component';
import { D3Service } from 'd3-ng2-service';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import {AssessmentFacade} from './services/assessment-facade.service';
import {EMIChartComponent} from './component/emi-results/emi-chart/emi-chart.component';

@NgModule({
  imports: [
    CommonModule,
    NgbTooltipModule
  ],
  declarations: [
    Kypo2AssessmentsResultsComponent,
    FFQResultsComponent,
    MCQResultsComponent,
    EMIResultsComponent,
    AssessmentVisualizationComponent,
    MCQChartComponent,
    EMIChartComponent
  ],
  exports: [
    Kypo2AssessmentsResultsComponent,
    FFQResultsComponent,
    MCQResultsComponent,
    EMIResultsComponent,
    AssessmentVisualizationComponent
  ],
  providers: [
    AssessmentFacade,
    D3Service
  ]
})
export class Kypo2AssessmentsResultsVisualizationModule { }
