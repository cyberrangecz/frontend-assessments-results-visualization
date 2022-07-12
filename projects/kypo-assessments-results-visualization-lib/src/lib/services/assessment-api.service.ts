import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { AssessmentMapper } from './mappers/assessment-mapper';
import { Assessment } from '../model/assessment';
import { AssessmentDTO } from '../model/DTO/assessment-dto';

/**
 * Service abstracting http communication with endpoint
 */
@Injectable()
export class AssessmentApi {
  private readonly visualizationsEndpoint = `${this.configService.config.trainingServiceUrl}visualizations`;

  constructor(private http: HttpClient, private configService: ConfigService) {}

  /**
   * Sends http request to retrieve all assessments to be displayed in the visualization
   * @param instanceId id of instance
   */
  getAssessments(instanceId: number): Observable<Assessment[]> {
    return this.http
      .get<AssessmentDTO[]>(`${this.visualizationsEndpoint}/training-instances/${instanceId}/assessments`)
      .pipe(map((response) => AssessmentMapper.fromDTOs(response)));
  }
}
