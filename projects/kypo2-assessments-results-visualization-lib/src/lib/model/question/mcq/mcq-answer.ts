import {Answer} from '../answer';
import {User} from 'kypo2-auth';

export class MCQAnswer extends Answer {
  userChoices: number[] = [];

  constructor(answerJSON, trainee: User) {
    super(trainee);
    this.userChoices = answerJSON.choices.sort((a, b) => a - b);
  }

  hasSameChoices(choices: number[]): boolean {
    if (this.userChoices === null || this.userChoices === undefined || choices === null || choices === undefined) {
      return false;
    }
    if (this.userChoices.length !== choices.length) {
      return false;
    }
    for (let i = 0; i < this.userChoices.length; i++) {
      if (this.userChoices[i] !== choices[i]) {
        return false;
      }
    }
    return true;
  }

  wasAnswered(): boolean {
    return this.userChoices && this.userChoices.length > 0;
  }

  hasMatchingAnswer(choiceIndex: number): boolean {
    return this.userChoices.filter(userChoice => userChoice === choiceIndex).length > 0;
  }

}
