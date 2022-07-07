import { Component, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Assessment } from './model/assessment';
import { KypoTraineeModeInfo } from './model/kypo-trainee-mode-info';
import { VisualizationSettings } from './model/visualization-settings';
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
   * MANDATORY Id of a training definition related with the training instance to be visualized.
   *
   */
  @Input() trainingDefinitionId: number;

  /**
   * MANDATORY Id of a training instance to be visualized
   */
  @Input() trainingInstanceId: number;

  /**
   * OPTIONAL info about trainee and his training run. Switches the visualization to a  trainee point-of-view mode instead of organizers
   * Anonymises names, logins, emails etc of other users
   */
  @Input() traineeModeInfo: KypoTraineeModeInfo;

  assessments$: Observable<Assessment[]>;
  constructor(private assessmentFacade: AssessmentApi) {}

  ngOnChanges(): void {
    const inputData = new VisualizationSettings(
      this.trainingDefinitionId,
      this.trainingInstanceId,
      this.traineeModeInfo
    );
    if (inputData.hasNecessaryIds()) {
      this.assessments$ = this.assessmentFacade.getAssessments(inputData);
    }
  }
}
