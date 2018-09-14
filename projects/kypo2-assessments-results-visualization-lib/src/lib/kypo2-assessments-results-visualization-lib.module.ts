import { NgModule } from '@angular/core';
import { Kypo2AssessmentsResultsVisualizationLibComponent } from './kypo2-assessments-results-visualization-lib.component';
import { FreeFormQuestionResultsComponent } from './components/free-form-question-results/free-form-question-results.component';
import { MultipleChoiceQuestionResultsComponent } from './components/multiple-choice-question-results/multiple-choice-question-results.component';
import { ExtendedMatchingResultsComponent } from './components/extended-matching-results/extended-matching-results.component';

@NgModule({
  imports: [
  ],
  declarations: [
    Kypo2AssessmentsResultsVisualizationLibComponent, 
    FreeFormQuestionResultsComponent, 
    MultipleChoiceQuestionResultsComponent, 
    ExtendedMatchingResultsComponent
  ],
  exports: [
    Kypo2AssessmentsResultsVisualizationLibComponent, 
    FreeFormQuestionResultsComponent, 
    MultipleChoiceQuestionResultsComponent, 
    ExtendedMatchingResultsComponent
  ]
})
export class Kypo2AssessmentsResultsVisualizationLibModule { }
