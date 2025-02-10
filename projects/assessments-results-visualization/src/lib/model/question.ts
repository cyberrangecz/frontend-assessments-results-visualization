import { Answer } from './answer';
import { EmiAnswers } from './emi-answers';

export class Question {
    id: number;
    questionType: string;
    text: string;
    order: number;
    answers: Answer[] | EmiAnswers[];
}
