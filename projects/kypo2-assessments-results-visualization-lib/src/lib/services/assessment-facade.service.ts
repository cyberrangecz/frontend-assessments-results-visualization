import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Assessment} from '../model/assessment';
import {forkJoin, Observable} from 'rxjs';
import {TrainingDefinitionDTO} from '../model/dto/training-definition-dto';
import {map} from 'rxjs/operators';
import {TrainingEventDTO} from '../model/dto/training-event-dto';
import {AssessmentEvent} from '../model/assessment-event';
import {TrainingAssessmentEventDTO} from '../model/dto/training-assessment-event-dto';
import {AssessmentLevelDTO} from '../model/dto/assessment-level-dto';
import {LevelDTO} from '../model/dto/level-dto';

@Injectable()
export class AssessmentFacade {

  constructor(private http: HttpClient) {
  }

  getAssessments(trainingDefinitionId: number, trainingInstanceId: number, trainingRunId: number = null): Observable<Assessment[]> {
    const assessmentDefinition$: Observable<Assessment[]> = this.http.get<TrainingDefinitionDTO>('assets/mock-td.json')
      .pipe(map(tdDTO => this.trainingDefinitionToAssessments(tdDTO)));
    const events$ = trainingRunId !== null
      ? this.http.get<TrainingEventDTO[]>('assets/mock-events.json')
      : this.http.get<TrainingEventDTO[]>('assets/mock-events.json');

    const assessmentEvents$: Observable<AssessmentEvent[]> = events$.pipe(map(eventDTO => this.eventsDTOToAssessmentEvents(eventDTO)));
    return forkJoin(
      [
        assessmentDefinition$,
        assessmentEvents$
      ]
    ).pipe(map(assessments => this.mergeDefinitionsWithEvents(assessments[0], assessments[1])));
  }

  private eventsDTOToAssessmentEvents(eventsDTO: TrainingEventDTO[]): AssessmentEvent[] {
    const assessmentEvents = eventsDTO.filter(eventDTO => TrainingEventDTO.isAssessmentAnsweredEvent(eventDTO)) as TrainingAssessmentEventDTO[];
    return assessmentEvents.map(assessmentEventDTO => new AssessmentEvent(assessmentEventDTO));
  }

  private trainingDefinitionToAssessments(tdDTO: TrainingDefinitionDTO): Assessment[] {
    const assessmentLevelDTOs = tdDTO.levels.filter(level => LevelDTO.isAssessmentLevel(level)) as AssessmentLevelDTO[];
    return assessmentLevelDTOs.map(assessmentLevelDTO =>  new Assessment(assessmentLevelDTO));
  }


  private mergeDefinitionsWithEvents(assessments: Assessment[], assessmentEvents: AssessmentEvent[]): Assessment[] {
    assessmentEvents.forEach(assessmentEvent => {
      const associatedAssessment = assessments.find(assessment => assessmentEvent.levelId === assessment.id);
      if (associatedAssessment) {
        associatedAssessment.fillAnswers(assessmentEvent);
      }
    });
    return assessments;
  }
}
