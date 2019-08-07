import {EMIChoice} from './emi-choice';
import {EMIAnswer} from './emi-answer';
import {Question} from '../question';

export class EMI extends Question {
    rows: string[] = [];
    cols: string[] = [];
    answers: EMIAnswer[] = [];
    correctChoices: EMIChoice[] = [];

  constructor(questionJSON, isTest: boolean) {
    super(questionJSON);
    this.type = 'EMI';
    this.cols = questionJSON.cols;
    this.rows = questionJSON.rows;
    if (isTest) {
      this.correctChoices = questionJSON.correct_answers
        .map(correctAnswerJSON => new EMIChoice(correctAnswerJSON.x, correctAnswerJSON.y))
        .sort((choiceA, choiceB) => choiceA.x - choiceB.x);
    }
  }

  evaluateAnswers() {
    if (this.correctChoices.length > 0) {
      this.answers.forEach( answer =>
        answer.isCorrect = answer.hasSameChoices(this.correctChoices)
      );
    }
  }

  isCorrectAnswer(row: number, col: number): boolean {
    return this.correctChoices.some(choice => choice.equals(new EMIChoice(row, col)));
  }

  filterAnswersByChoice(row: number, col: number): EMIAnswer[] {
    return this.answers.filter(answer => answer.hasChoice(new EMIChoice(row, col)));
  }

  calculateSameAnswersCount(row: number, col: number): number {
    return this.filterAnswersByChoice(row, col).length;
  }

  calculateMatchingAnswersPercentage(row: number, col: number): number {
    if (this.answers.length <= 0) {
      return 0;
    }
    return (this.filterAnswersByChoice(row, col).length / this.answers.length) * 100;
  }
}
