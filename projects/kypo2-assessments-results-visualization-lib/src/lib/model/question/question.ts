import { Answer } from './answer';

/**
 * Abstract class representing a question in assessment
 */
export abstract class Question {
  title: string;
  order: number;
  score: number;
  penalty: number;
  type: string;
  answers: Answer[] = [];

  protected constructor(questionJSON) {
    this.title = questionJSON.text;
    this.penalty = questionJSON.penalty;
    this.score = questionJSON.points;
    this.order = questionJSON.order;
  }

  /**
   * Evaluates if answer was answered correctly or not and stores the result in answer object
   */
  abstract evaluateAnswers();
}
