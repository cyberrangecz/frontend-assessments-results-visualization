import { MCQTableRow } from './mcq-table-row';
import { Question } from '../question';
import { Answer } from '../answer';

/**
 * Adapter class for multiple choice question table
 */
export class MCQTableAdapter {
    rows: MCQTableRow[];

    constructor(question: Question) {
        const answers: Answer[] = question.answers as Answer[];
        const totalAnswers = answers.reduce((sum, current) => sum + current.participants.length, 0);
        this.rows = answers.map((answer) => {
            const row = new MCQTableRow();
            row.option = answer.text;
            row.isCorrect = answer.correct;
            row.participants = answer.participants;
            row.answeredCount = answer.participants.length;
            row.answeredPercentage = (answer.participants.length * 100) / totalAnswers;
            return row;
        });
    }
}
