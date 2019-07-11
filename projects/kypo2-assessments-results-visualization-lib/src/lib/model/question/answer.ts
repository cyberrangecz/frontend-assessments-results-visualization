import {Trainee} from '../trainee';

export abstract class Answer {
  trainee: Trainee;
  isCorrect: boolean;

  protected constructor(trainee: Trainee) {
    this.trainee = trainee;
  }

  abstract wasAnswered(): boolean;
}
