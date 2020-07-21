import { AssessmentVisualizationConfig } from '../../projects/kypo2-assessments-results-visualization-lib/src/public_api';
import { environment } from '../environments/environment';

export const VISUALIZATION_CONFIG: AssessmentVisualizationConfig = {
  trainingServiceUrl: environment.trainingServiceUrl,
  elasticSearchServiceUrl: environment.elasticSearchServiceUrl,
};
