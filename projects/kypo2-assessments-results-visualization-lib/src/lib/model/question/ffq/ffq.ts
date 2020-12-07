import { Question } from '../question';
import { FFQAnswer } from './ffq-answer';

/**
 *  Class representing a free form question
 *
 *  For example:
 *  FFQ - What is 2 + 2
 *  and correctAnswers being: ['4', 'four']
 *  The question can also be a questionnaire, not a test. Then correct choices are [] and correctness of answers is not evaluated
 */
export class FFQ extends Question {
  correctAnswers: string[] = [];
  answers: FFQAnswer[];

  constructor(questionJSON: any, isTest: boolean) {
    super(questionJSON);
    this.type = 'FFQ';
    if (isTest) {
      this.correctAnswers = questionJSON.correct_choices;
    }
  }

  /**
   * Evaluates correctness of all associated answers
   */
  evaluateAnswers(): void {
    this.answers.forEach((answer) => {
      answer.isCorrect = this.correctAnswers.some((correctAnswer) => answer.hasSameText(correctAnswer));
    });
  }
}
