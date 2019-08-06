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
import {ConfigService} from './config.service';

@Injectable()
export class AssessmentFacade {

  constructor(private http: HttpClient,
              private configService: ConfigService) {
  }

  getAssessments(trainingDefinitionId: number, trainingInstanceId: number, trainingRunId: number = null): Observable<Assessment[]> {
    const assessmentDefinition$ = this.http.get<TrainingDefinitionDTO>(this.createDefinitionInfoUrl(trainingInstanceId))
      .pipe(map(tdDTO => this.trainingDefinitionToAssessments(tdDTO)));

    const events$ = trainingRunId !== null
      ? this.http.get<TrainingEventDTO[]>(this.createEventsUrl(trainingDefinitionId, trainingInstanceId, trainingRunId))
      : this.http.get<TrainingEventDTO[]>(this.createEventsUrl(trainingDefinitionId, trainingInstanceId));

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

  private createEventsUrl(trainingDefinitionId: number, trainingInstanceId: number, trainingRunId: number = null): string {
    const baseUrl = this.configService.config.restBaseUrl;
    return trainingRunId !== null
      ? `${baseUrl}training-events/training-definitions/${trainingDefinitionId}/training-instances/${trainingInstanceId}/training-runs/${trainingRunId}`
      : `${baseUrl}training-events/training-definitions/${trainingDefinitionId}/training-instances/${trainingInstanceId}`;
  }

  private createDefinitionInfoUrl(trainingInstanceId: number): string {
    const baseUrl = this.configService.config.restBaseUrl;
    return baseUrl + 'visualizations/training-instances/' + trainingInstanceId;
  }
}
