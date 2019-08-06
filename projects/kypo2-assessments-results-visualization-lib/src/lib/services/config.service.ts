import {Injectable} from '@angular/core';
import {Kypo2AssessmentConfig} from '../model/config/kypo2-asssessment-config';

@Injectable()
export class ConfigService {
  config: Kypo2AssessmentConfig;

  constructor(config: Kypo2AssessmentConfig) {
    this.config = config;
  }
}
