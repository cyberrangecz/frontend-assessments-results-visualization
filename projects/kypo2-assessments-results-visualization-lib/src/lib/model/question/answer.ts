import {Trainee} from '../trainee';

export abstract class Answer {
  trainee: Trainee;
  isCorrect: boolean;
  selected: boolean;

  protected constructor(trainee: Trainee) {
    this.trainee = trainee;
  }

  abstract wasAnswered(): boolean;

  select(trainee) {
    this.selected = this.trainee.equals(trainee);
  }

  unselect() {
    this.selected = false;
  }
}
