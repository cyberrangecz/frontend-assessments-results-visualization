import { MCQ } from '../question/mcq/mcq';
import { MCQTableRow } from './mcq-table-row';

/**
 * Adapter class for multiple choice question table
 */
export class MCQTableAdapter {
  rows: MCQTableRow[];

  constructor(question: MCQ) {
    this.rows = question.options.map((option) => {
      const row = new MCQTableRow();
      row.option = option;
      row.isCorrect = question.isCorrectAnswer(option);
      row.answers = question.filterAnswersByChoice(option);
      row.answeredCount = question.calculateSameAnswersCount(option);
      row.answeredPercentage = question.calculateMatchingAnswersShare(option);
      return row;
    });
  }
}
