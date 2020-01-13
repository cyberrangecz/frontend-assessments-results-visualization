import {EMIAnswer} from '../question/emi/emi-answer';

/**
 * Row in a extend matching items table
 */
export class EMITableRow {
  option: string;
  answers: EMIAnswer[];
  isCorrect: boolean;
  answeredCount: number;
  answeredPercentage: number;
}
