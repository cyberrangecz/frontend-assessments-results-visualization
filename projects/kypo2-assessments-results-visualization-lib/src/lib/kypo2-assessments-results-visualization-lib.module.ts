import { NgModule } from '@angular/core';
import { Kypo2AssessmentsResultsVisualizationLibComponent } from './kypo2-assessments-results-visualization-lib.component';
import { FreeFormQuestionResultsComponent } from './components/free-form-question-results/free-form-question-results.component';
import { MultipleChoiceQuestionResultsComponent } from './components/multiple-choice-question-results/multiple-choice-question-results.component';
import { ExtendedMatchingResultsComponent } from './components/extended-matching-results/extended-matching-results.component';
import { VisualizationsComponent } from './components/visualizations/visualizations.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    Kypo2AssessmentsResultsVisualizationLibComponent, 
    FreeFormQuestionResultsComponent, 
    MultipleChoiceQuestionResultsComponent, 
    ExtendedMatchingResultsComponent, 
    VisualizationsComponent
  ],
  exports: [
    Kypo2AssessmentsResultsVisualizationLibComponent, 
    FreeFormQuestionResultsComponent, 
    MultipleChoiceQuestionResultsComponent, 
    ExtendedMatchingResultsComponent,
    VisualizationsComponent
  ]
})
export class Kypo2AssessmentsResultsVisualizationLibModule { }
