import { Question } from '../question';
import { Answer } from '../answer';
import { FFQTableRow } from './ffq-table-row';

export class FFQTableAdapter {
  rows: FFQTableAdapter[];

  constructor(question: Question) {
    const answers: Answer[] = question.answers as Answer[];
    this.rows = [];
    this.rows = [].concat(
      ...answers.map((answer) => {
        return answer.participants.map((participant) => {
          const row = new FFQTableRow();
          row.answer = answer.text;
          row.isCorrect = answer.correct;
          row.participant = participant;
          return row;
        });
      }),
    );
  }
}
