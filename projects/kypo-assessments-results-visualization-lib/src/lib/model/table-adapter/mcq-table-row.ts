import { MCQAnswer } from '../question/mcq/mcq-answer';

/**
 * Table row in multiple choice question table
 */
export class MCQTableRow {
  option: string;
  answers: MCQAnswer[];
  isCorrect: boolean;
  answeredCount: number;
  answeredPercentage: number;
}
