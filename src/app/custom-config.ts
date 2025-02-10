import {
    AssessmentVisualizationConfig
} from '../../projects/assessments-results-visualization/src/public_api';
import { environment } from '../environments/environment';

export const VISUALIZATION_CONFIG: AssessmentVisualizationConfig = {
    trainingServiceUrl: environment.trainingServiceUrl,
};
