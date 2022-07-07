import { LevelDTO } from './level-dto';
import { QuestionDTO } from './question-dto';

export class AssessmentLevelDTO extends LevelDTO {
  assessment_type: string;
  questions: QuestionDTO[];

  static isTest(level: AssessmentLevelDTO): boolean {
    return level.assessment_type === 'TEST';
  }
}
