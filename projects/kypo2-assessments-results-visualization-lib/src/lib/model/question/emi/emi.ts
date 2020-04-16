import { Question } from '../question';
import { EMIAnswer } from './emi-answer';
import { EMIChoice } from './emi-choice';

/**
 * Class representing a extended matching items question
 *
 * For example:
 * EMI - Match books with authors
 * rows being: [William Shakespeare, Oscar Wilde],
 * cols being [Hamlet, Catcher in the Rye, The Picture of Dorian Gray, The Raven],
 * and correctChoices being: [{x: 0 , y: 0 }, { x: 1 , y: 2}]
 * The question can also be a questionnaire, not a test. Then correct choices are [] and correctness of answers is not evaluated
 */
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
        .map((correctAnswerJSON) => new EMIChoice(correctAnswerJSON.x, correctAnswerJSON.y))
        .sort((choiceA, choiceB) => choiceA.x - choiceB.x);
    }
  }

  /**
   * Evaluates correctness of all associated answers
   */
  evaluateAnswers() {
    if (this.correctChoices.length > 0) {
      this.answers.forEach((answer) => (answer.isCorrect = answer.hasSameChoices(this.correctChoices)));
    }
  }

  /**
   * True if provided combination is the correct answer, false otherwise
   * @param row index of a row (x)
   * @param col index of a column (y)
   */
  isCorrectAnswer(row: number, col: number): boolean {
    return this.correctChoices.some((choice) => choice.equals(new EMIChoice(row, col)));
  }

  /**
   * Returns all answers containing provided choice
   * @param row index of a row (x)
   * @param col index of a column (y)
   */
  filterAnswersByChoice(row: number, col: number): EMIAnswer[] {
    return this.answers.filter((answer) => answer.hasChoice(new EMIChoice(row, col)));
  }

  /**
   * Calculates number of answers matching provided choice
   * @param row index of a row (x)
   * @param col index of a column (y)
   */
  calculateSameAnswersCount(row: number, col: number): number {
    return this.filterAnswersByChoice(row, col).length;
  }

  /**
   * Calculates total share of the answer and returns result as percentage (number 0 - 100)
   * @param row index of a row (x)
   * @param col index of a column (y)
   */
  calculateMatchingAnswersShare(row: number, col: number): number {
    if (this.answers.length <= 0) {
      return 0;
    }
    return (this.filterAnswersByChoice(row, col).length / this.answers.length) * 100;
  }
}
