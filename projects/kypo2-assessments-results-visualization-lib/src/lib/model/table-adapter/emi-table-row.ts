import {EMIAnswer} from '../question/emi/emi-answer';

export class EMITableRow {
  option: string;
  answers: EMIAnswer[];
  isCorrect: boolean;
  answeredCount: number;
  answeredPercentage: number;
}
