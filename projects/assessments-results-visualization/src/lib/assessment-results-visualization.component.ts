import { Component, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Assessment } from './model/assessment';
import { AssessmentApi } from './services/assessment-api.service';

/**
 * Main component of the assessment visualization
 */
@Component({
  selector: 'crczp-assessment-results-visualization',
  template: ` <crczp-assessment-results [assessments]="assessments$ | async"></crczp-assessment-results> `,
  styles: [],
})
export class AssessmentResultsVisualizationComponent implements OnChanges {
  /**
   * Id of a training instance to be visualized
   */
  @Input() trainingInstanceId: number;

  assessments$: Observable<Assessment[]>;

  constructor(private assessmentFacade: AssessmentApi) {}

  ngOnChanges(): void {
    if (this.trainingInstanceId) {
      this.assessments$ = this.assessmentFacade.getAssessments(this.trainingInstanceId);
    }
  }
}
