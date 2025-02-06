import { Component, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Assessment } from './model/assessment';
import { AssessmentApi } from './services/assessment-api.service';

/**
 * Main component of the assessment visualization
 */
@Component({
  selector: 'kypo-assessment-results-viz',
  template: ` <kypo-assessment-results [assessments]="assessments$ | async"></kypo-assessment-results> `,
  styles: [],
})
export class KypoAssessmentResultsVisualizationComponent implements OnChanges {
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
