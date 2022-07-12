import { EMITableRow } from './emi-table-row';
import { EmiAnswers } from '../emi-answers';

/**
 * Adapter class for extended matching items table
 */
export class EMITableAdapter {
  rows: EMITableRow[];

  constructor(answer: EmiAnswers) {
    const totalAnswers = answer.options.reduce((sum, answer) => sum + answer.participants.length, 0);
    this.rows = answer.options.map((option) => {
      const row = new EMITableRow();
      row.option = option.text;
      row.isCorrect = option.correct;
      row.participants = option.participants;
      row.answeredCount = option.participants.length;
      row.answeredPercentage = (option.participants.length * 100) / totalAnswers;
      return row;
    });
  }
}
