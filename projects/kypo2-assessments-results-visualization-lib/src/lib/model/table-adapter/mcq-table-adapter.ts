import {MCQTableRow} from './mcq-table-row';
import {MCQ} from '../question/mcq/mcq';

export class MCQTableAdapter {
  rows: MCQTableRow[];

  constructor(question: MCQ) {
    this.rows = question.options.map((option, index) => {
      const row = new MCQTableRow();
      row.option = option;
      row.isCorrect = question.isCorrectAnswer(index);
      row.answers = question.filterAnswersByChoice(index);
      row.answeredCount = question.calculateSameAnswersCount(index);
      row.answeredPercentage = question.calculateMatchingAnswersPercentage(index);
      return row;
    });
  }
}
