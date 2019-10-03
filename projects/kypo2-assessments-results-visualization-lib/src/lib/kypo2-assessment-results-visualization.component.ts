import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AssessmentFacade} from './services/assessment-facade.service';
import {Observable} from 'rxjs';
import {Assessment} from './model/assessment';
import {VizualizationInput} from './model/vizualization-input';
import {Kypo2TraineeModeInfo} from './model/kypo2-trainee-mode-info';

@Component({
  selector: 'kypo2-assessment-results-viz',
  template: `
      <kypo2-assessment-results [assessments]="assessments$ | async"></kypo2-assessment-results>
  `,
  styles: []
})
export class Kypo2AssessmentResultsVisualizationComponent implements OnInit, OnChanges {

  @Input() trainingDefinitionId: number;
  @Input() trainingInstanceId: number;
  @Input() traineeModeInfo: Kypo2TraineeModeInfo;

  assessments$: Observable<Assessment[]>;
  constructor(private assessmentFacade: AssessmentFacade) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const inputData = new VizualizationInput(this.trainingDefinitionId, this.trainingInstanceId, this.traineeModeInfo);
    if (inputData.hasNecessaryIds()) {
      this.assessments$ = this.assessmentFacade.getAssessments(inputData);
    }
  }
}
