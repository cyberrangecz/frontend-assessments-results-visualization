import { Injectable } from '@angular/core';
import { AssessmentVisualizationConfig } from '../model/config/asssessment-visualization-config';

/**
 * Service holding state of the library configuration
 */
@Injectable()
export class ConfigService {
  config: AssessmentVisualizationConfig;

  constructor(config: AssessmentVisualizationConfig) {
    this.config = config;
  }
}
