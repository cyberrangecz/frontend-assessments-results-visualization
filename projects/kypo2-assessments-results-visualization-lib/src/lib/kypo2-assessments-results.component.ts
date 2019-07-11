import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AssessmentFacade} from './services/assessment-facade.service';
import {Observable} from 'rxjs';
import {Assessment} from './model/assessment';

@Component({
  selector: 'kypo2-viz-assessments-results',
  template: `
    <kypo2-viz-assessments-results-visualization [assessments]="assessments$ | async" ></kypo2-viz-assessments-results-visualization>
  `,
  styles: []
})
export class Kypo2AssessmentsResultsComponent implements OnInit, OnChanges {

  @Input() trainingDefinitionId: number;
  @Input() trainingInstanceId: number;
  @Input() trainingRunId: number;

  assessments$: Observable<Assessment[]>;
  constructor(private assessmentFacade: AssessmentFacade) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.hasAllIds()) {
      if (this.trainingRunId !== undefined) {
        this.assessments$ = this.assessmentFacade.getAssessments(this.trainingDefinitionId, this.trainingInstanceId, this.trainingRunId);
      } else {
        this.assessments$ = this.assessmentFacade.getAssessments(this.trainingDefinitionId, this.trainingInstanceId);
      }
    }
  }

  private hasAllIds(): boolean {
    return this.trainingDefinitionId !== undefined && this.trainingDefinitionId !== null && this.trainingInstanceId !== undefined && this.trainingInstanceId !== null;
  }
}
