import {User} from 'kypo2-auth';

export abstract class Answer {
  trainee: User;
  isCorrect: boolean;
  selected: boolean;

  protected constructor(trainee: User) {
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
