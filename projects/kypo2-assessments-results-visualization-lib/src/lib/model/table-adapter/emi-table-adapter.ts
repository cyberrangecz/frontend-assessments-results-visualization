import {EMITableRow} from './emi-table-row';
import {EMI} from '../question/emi/emi';

/**
 * Adapter class for extended matching items table
 */
export class EMITableAdapter {
  rows: EMITableRow[];

  constructor(question: EMI, rowIndex: number) {
    this.rows = question.cols.map((col, colIndex) => {
      const row = new EMITableRow();
      row.option = col;
      row.isCorrect = question.isCorrectAnswer(rowIndex, colIndex);
      row.answers = question.filterAnswersByChoice(rowIndex, colIndex);
      row.answeredCount = question.calculateSameAnswersCount(rowIndex, colIndex);
      row.answeredPercentage = question.calculateMatchingAnswersShare(rowIndex, colIndex);
      return row;
    });
  }
}
