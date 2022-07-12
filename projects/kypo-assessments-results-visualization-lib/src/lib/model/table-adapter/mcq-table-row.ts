import { Participant } from '../participant';

/**
 * Table row in multiple choice question table
 */
export class MCQTableRow {
  option: string;
  participants: Participant[];
  isCorrect: boolean;
  answeredCount: number;
  answeredPercentage: number;
}
