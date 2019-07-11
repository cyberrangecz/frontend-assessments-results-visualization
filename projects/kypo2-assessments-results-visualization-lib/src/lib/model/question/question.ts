import {Answer} from './answer';

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

  abstract evaluateAnswers();
}
