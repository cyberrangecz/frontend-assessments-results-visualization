import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Assessment} from '../model/assessment';
import {EMPTY, forkJoin, Observable, of} from 'rxjs';
import {TrainingDefinitionDTO} from '../model/dto/training-definition-dto';
import {map} from 'rxjs/operators';
import {TrainingEventDTO} from '../model/dto/training-event-dto';
import {AssessmentEvent} from '../model/assessment-event';
import {TrainingAssessmentEventDTO} from '../model/dto/training-assessment-event-dto';
import {AssessmentLevelDTO} from '../model/dto/assessment-level-dto';
import {LevelDTO} from '../model/dto/level-dto';
import {ConfigService} from './config.service';
import {User, UserDTO} from 'kypo2-auth';
import {VizualizationInput} from '../model/vizualization-input';

@Injectable()
export class AssessmentFacade {

  constructor(private http: HttpClient,
              private configService: ConfigService) {
  }

  getAssessments(inputData: VizualizationInput): Observable<Assessment[]> {
    return forkJoin(
      [
        this.getAssessmentDefinition(inputData),
        this.getEvents(inputData),
        inputData.anonymizeTrainees() ? of(null) : this.getTrainees(inputData)
      ]
    ).pipe(map(assessments => {
      let eventsWithTrainees: AssessmentEvent[];
      if (assessments[2] === null) {
        eventsWithTrainees = this.fillEventsWithAnonymousTrainees(assessments[1], inputData.activeTraineeId);
      } else {
        eventsWithTrainees = this.fillEventsWithTrainees(assessments[1], assessments[2]);
      }
      return this.fillAssessmentsWithEvents(assessments[0], eventsWithTrainees);
    }));
  }

  private getTrainees(inputData: VizualizationInput): Observable<User[]> {
    return this.http.get<UserDTO[]>(this.createTraineesUrl(inputData.trainingInstanceId))
      .pipe(
        map(userDTOs => userDTOs.map(userDTO => User.fromDTO(userDTO)))
      );
  }

  private getAssessmentDefinition(inputData: VizualizationInput): Observable<Assessment[]> {
    const definition$ = inputData.anonymizeTrainees()
      ? this.http.get<TrainingDefinitionDTO>(this.createDefinitionInfoUrl(inputData.trainingInstanceId, inputData.trainingRunId))
      : this.http.get<TrainingDefinitionDTO>(this.createDefinitionInfoUrl(inputData.trainingInstanceId));
    return definition$
      .pipe(
        map(tdDTO => this.trainingDefinitionToAssessments(tdDTO))
      );
  }

  private getEvents(inputData: VizualizationInput): Observable<AssessmentEvent[]> {
    return this.http.get<TrainingEventDTO[]>(this.createEventsUrl(inputData.trainingDefinitionId, inputData.trainingInstanceId))
      .pipe(
        map(eventDTO => this.eventsDTOToAssessmentEvents(eventDTO))
      );
  }

  private eventsDTOToAssessmentEvents(eventsDTO: TrainingEventDTO[]): AssessmentEvent[] {
    const assessmentEvents = eventsDTO.filter(eventDTO => TrainingEventDTO.isAssessmentAnsweredEvent(eventDTO)) as TrainingAssessmentEventDTO[];
    return assessmentEvents.map(assessmentEventDTO => new AssessmentEvent(assessmentEventDTO));
  }

  private trainingDefinitionToAssessments(tdDTO: TrainingDefinitionDTO): Assessment[] {
    const assessmentLevelDTOs = tdDTO.levels.filter(level => LevelDTO.isAssessmentLevel(level)) as AssessmentLevelDTO[];
    return assessmentLevelDTOs.map(assessmentLevelDTO =>  new Assessment(assessmentLevelDTO));
  }


  private fillAssessmentsWithEvents(assessments: Assessment[], assessmentEvents: AssessmentEvent[]): Assessment[] {
    assessmentEvents.forEach(assessmentEvent => {
      const associatedAssessment = assessments.find(assessment => assessmentEvent.levelId === assessment.id);
      if (associatedAssessment) {
        associatedAssessment.fillAnswers(assessmentEvent);
      } else {
        console.error(`DATA INCONSISTENCY: No assessment with levelId: ${assessmentEvent.levelId} found`);
      }
    });
    return assessments;
  }

  private fillEventsWithTrainees(assessmentEvents: AssessmentEvent[], trainees: User[]): AssessmentEvent[] {
    assessmentEvents.forEach(event => {
      const matchedTrainee = trainees.find(trainee => trainee.id === event.traineeId);
      if (matchedTrainee) {
        event.trainee = matchedTrainee;
      } else {
        console.error(`DATA INCONSISTENCY: No user with id: ${event.traineeId} found`);
      }
    });
    return assessmentEvents;
  }

  private fillEventsWithAnonymousTrainees(events: AssessmentEvent[], activeUserId: number): AssessmentEvent[]  {
    events.forEach(event => {
      const trainee = new User([]);
      trainee.id = event.traineeId;
      trainee.name = event.traineeId === activeUserId ? 'you' : 'other player';
      event.trainee = trainee;
    });
    return events;
  }

  private createEventsUrl(trainingDefinitionId: number, trainingInstanceId: number): string {
    const baseUrl = this.configService.config.restBaseUrl;
    return `${baseUrl}training-events/training-definitions/${trainingDefinitionId}/training-instances/${trainingInstanceId}`;
  }

  private createDefinitionInfoUrl(trainingInstanceId: number, trainingRunId: number = null): string {
    const baseUrl = this.configService.config.restBaseUrl;
    return trainingRunId !== null
    ? `${baseUrl}visualizations/training-runs/${trainingRunId}`
    : `${baseUrl}visualizations/training-instances/${trainingInstanceId}`;
  }

  private createTraineesUrl(trainingInstanceId: number): string {
    const baseUrl = this.configService.config.restBaseUrl;
    return `${baseUrl}visualizations/training-instances/${trainingInstanceId}/participants`;
  }
}
