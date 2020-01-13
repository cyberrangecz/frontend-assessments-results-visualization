import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AssessmentApi} from './services/assessment-api.service';
import {Observable} from 'rxjs';
import {Assessment} from './model/assessment';
import {VisualizationSettings} from './model/visualization-settings';
import {Kypo2TraineeModeInfo} from './model/kypo2-trainee-mode-info';

/**
 * Main component of the assessment visualization
 */
@Component({
  selector: 'kypo2-assessment-results-viz',
  template: `
      <kypo2-assessment-results [assessments]="assessments$ | async"></kypo2-assessment-results>
  `,
  styles: []
})
export class Kypo2AssessmentResultsVisualizationComponent implements OnInit, OnChanges {

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
  @Input() traineeModeInfo: Kypo2TraineeModeInfo;

  assessments$: Observable<Assessment[]>;
  constructor(private assessmentFacade: AssessmentApi) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const inputData = new VisualizationSettings(this.trainingDefinitionId, this.trainingInstanceId, this.traineeModeInfo);
    if (inputData.hasNecessaryIds()) {
      this.assessments$ = this.assessmentFacade.getAssessments(inputData);
    }
  }
}
