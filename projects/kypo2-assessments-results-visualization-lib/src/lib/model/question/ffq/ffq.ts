import {Question} from '../question';
import {FFQAnswer} from './ffq-answer';

export class FFQ extends Question {
    correctAnswers: string[] = [];
    answers: FFQAnswer[];

  constructor(questionJSON, isTest: boolean) {
    super(questionJSON);
    this.type = 'FFQ';
    if (isTest) {
      this.correctAnswers = questionJSON.correct_choices;
    }
  }

  evaluateAnswers() {
    this.answers.forEach(answer => {
      answer.isCorrect = this.correctAnswers.some(correctAnswer => answer.hasSameText(correctAnswer));
    });
  }
}
