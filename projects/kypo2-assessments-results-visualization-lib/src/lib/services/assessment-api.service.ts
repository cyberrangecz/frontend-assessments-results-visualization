import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserDTO } from 'kypo2-auth';
import { forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Assessment } from '../model/assessment';
import { AssessmentEvent } from '../model/assessment-event';
import { AssessmentLevelDTO } from '../model/dto/assessment-level-dto';
import { LevelDTO } from '../model/dto/level-dto';
import { TrainingAssessmentEventDTO } from '../model/dto/training-assessment-event-dto';
import { TrainingDefinitionDTO } from '../model/dto/training-definition-dto';
import { TrainingEventDTO } from '../model/dto/training-event-dto';
import { VisualizationSettings } from '../model/visualization-settings';
import { ConfigService } from './config.service';

/**
 * Service abstracting http communication with endpoint
 */
@Injectable()
export class AssessmentApi {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  /**
   * Sends http request to retrieve all assessments to be displayed in the visualization
   * @param settings all ids and settings necessary to retrieve correct assessments
   */
  getAssessments(settings: VisualizationSettings): Observable<Assessment[]> {
    return forkJoin([
      this.getAssessmentDefinition(settings),
      this.getEvents(settings),
      settings.shouldAnonymiseTrainees() ? of(null) : this.getTrainees(settings),
    ]).pipe(
      map((assessments) => {
        let eventsWithTrainees: AssessmentEvent[];
        if (assessments[2] === null) {
          // if trainees were anonymized
          eventsWithTrainees = this.associateEventsWithAnonymousTrainees(assessments[1], settings.activeTraineeId);
        } else {
          eventsWithTrainees = this.associateEventsWithTrainees(assessments[1], assessments[2]);
        }
        return this.associateAssessmentsWithEvents(assessments[0], eventsWithTrainees);
      })
    );
  }

  /**
   * Sends http request to retrieve all trainees participating in training run
   * @param settings all ids and settings necessary to retrieve correct trainees
   */
  private getTrainees(settings: VisualizationSettings): Observable<User[]> {
    return this.http
      .get<UserDTO[]>(this.createTraineesUrl(settings.trainingInstanceId))
      .pipe(map((userDTOs) => userDTOs.map((userDTO) => User.fromDTO(userDTO))));
  }

  /**
   * Sends http request to retrieve assessment definitions
   * @param settings all ids and settings necessary to retrieve correct assessments
   */
  private getAssessmentDefinition(settings: VisualizationSettings): Observable<Assessment[]> {
    // We need to call different endpoint based on the "point of view" of the visualization due to access rights restrictions
    const definition$ = settings.shouldAnonymiseTrainees()
      ? this.http.get<TrainingDefinitionDTO>(
          this.createDefinitionInfoUrl(settings.trainingInstanceId, settings.trainingRunId)
        )
      : this.http.get<TrainingDefinitionDTO>(this.createDefinitionInfoUrl(settings.trainingInstanceId));
    return definition$.pipe(map((tdDTO) => this.trainingDefinitionToAssessments(tdDTO)));
  }

  /**
   * Sends http request to retrieve events in assessment
   * @param settings all ids and settings necessary to retrieve correct assessments
   */
  private getEvents(settings: VisualizationSettings): Observable<AssessmentEvent[]> {
    return this.http
      .get<TrainingEventDTO[]>(this.createEventsUrl(settings.trainingDefinitionId, settings.trainingInstanceId))
      .pipe(map((eventDTO) => this.eventsDTOToAssessmentEvents(eventDTO)));
  }

  private eventsDTOToAssessmentEvents(eventsDTO: TrainingEventDTO[]): AssessmentEvent[] {
    const assessmentEvents = eventsDTO.filter((eventDTO) =>
      TrainingEventDTO.isAssessmentAnsweredEvent(eventDTO)
    ) as TrainingAssessmentEventDTO[];
    return assessmentEvents.map((assessmentEventDTO) => new AssessmentEvent(assessmentEventDTO));
  }

  private trainingDefinitionToAssessments(tdDTO: TrainingDefinitionDTO): Assessment[] {
    const assessmentLevelDTOs = tdDTO.levels.filter((level) =>
      LevelDTO.isAssessmentLevel(level)
    ) as AssessmentLevelDTO[];
    return assessmentLevelDTOs.map((assessmentLevelDTO) => new Assessment(assessmentLevelDTO));
  }

  /**
   * Connects events with associated assessments in internal model and returns assessments containing events
   * @param assessments assessments to associate with events
   * @param assessmentEvents events to associate with assessments
   */
  private associateAssessmentsWithEvents(assessments: Assessment[], assessmentEvents: AssessmentEvent[]): Assessment[] {
    assessmentEvents.forEach((assessmentEvent) => {
      const associatedAssessment = assessments.find((assessment) => assessmentEvent.levelId === assessment.id);
      if (associatedAssessment) {
        associatedAssessment.fillAnswers(assessmentEvent);
      } else {
        console.error(`DATA INCONSISTENCY: No assessment with levelId: ${assessmentEvent.levelId} found`);
      }
    });
    return assessments;
  }

  /**
   * Connects events with associated trainees in internal model and returns events containing trainee info
   * @param assessmentEvents events to associate with trainees
   * @param trainees trainees to associate with events
   */
  private associateEventsWithTrainees(assessmentEvents: AssessmentEvent[], trainees: User[]): AssessmentEvent[] {
    assessmentEvents.forEach((event) => {
      const matchedTrainee = trainees.find((trainee) => trainee.id === event.traineeId);
      if (matchedTrainee) {
        event.trainee = matchedTrainee;
      } else {
        console.error(`DATA INCONSISTENCY: No user with id: ${event.traineeId} found`);
      }
    });
    return assessmentEvents;
  }

  /**
   * Similar purpose as associateEventsWithTrainees method but hides names and other data about trainees
   * @param events events to associated with anonymous trainees
   * @param activeUserId id of a user from which point of view should the visualization be displayed
   */
  private associateEventsWithAnonymousTrainees(events: AssessmentEvent[], activeUserId: number): AssessmentEvent[] {
    events.forEach((event) => {
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
