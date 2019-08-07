import {MCQAnswer} from '../question/mcq/mcq-answer';

export class MCQTableRow {
  option: string;
  answers: MCQAnswer[];
  isCorrect: boolean;
  answeredCount: number;
  answeredPercentage: number;
}
