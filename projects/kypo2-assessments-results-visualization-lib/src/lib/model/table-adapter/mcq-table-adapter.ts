import { MCQ } from '../question/mcq/mcq';
import { MCQTableRow } from './mcq-table-row';

/**
 * Adapter class for multiple choice question table
 */
export class MCQTableAdapter {
  rows: MCQTableRow[];

  constructor(question: MCQ) {
    this.rows = question.options.map((option, index) => {
      const row = new MCQTableRow();
      row.option = option;
      row.isCorrect = question.isCorrectAnswer(index);
      row.answers = question.filterAnswersByChoice(index);
      row.answeredCount = question.calculateSameAnswersCount(index);
      row.answeredPercentage = question.calculateMatchingAnswersShare(index);
      return row;
    });
  }
}
