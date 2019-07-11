import {LevelDTO} from './level-dto';

export class AssessmentLevelDTO extends LevelDTO {
  assessment_type: string;
  questions: string;

  static isTest(level: AssessmentLevelDTO): boolean {
    return level.assessment_type === 'TEST';
  }
}
