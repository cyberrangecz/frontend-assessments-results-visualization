import { NgModule } from '@angular/core';
import { Kypo2AssessmentsResultsVisualizationLibComponent } from './kypo2-assessments-results-visualization-lib.component';
import { FreeFormQuestionResultsComponent } from './components/free-form-question-results/free-form-question-results.component';
import { MultipleChoiceQuestionResultsComponent } from './components/multiple-choice-question-results/multiple-choice-question-results.component';
import { ExtendedMatchingResultsComponent } from './components/extended-matching-results/extended-matching-results.component';
import { VisualizationsComponent } from './components/visualizations/visualizations.component';
import { CommonModule } from '@angular/common';
import { MultipleChoiceQuestionChartComponent } from './components/multiple-choice-question-results/multiple-choice-question-chart/multiple-choice-question-chart.component';
import { D3Service } from 'd3-ng2-service';
import { EventsService } from './services/events.service';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbTooltipModule
  ],
  declarations: [
    Kypo2AssessmentsResultsVisualizationLibComponent, 
    FreeFormQuestionResultsComponent, 
    MultipleChoiceQuestionResultsComponent, 
    ExtendedMatchingResultsComponent, 
    VisualizationsComponent, MultipleChoiceQuestionChartComponent
  ],
  exports: [
    Kypo2AssessmentsResultsVisualizationLibComponent, 
    FreeFormQuestionResultsComponent, 
    MultipleChoiceQuestionResultsComponent, 
    ExtendedMatchingResultsComponent,
    VisualizationsComponent
  ],
  providers: [
    D3Service,
    EventsService
  ]
})
export class Kypo2AssessmentsResultsVisualizationLibModule { }
