import {EMIChoice} from './emi-choice';
import {Answer} from '../answer';
import {Trainee} from '../../trainee';

export class EMIAnswer extends Answer {
    choices: EMIChoice[] = [];

  constructor(answerJSON, trainee: Trainee) {
    super(trainee);
    this.choices = answerJSON.pairs
      .map(pair => new EMIChoice(pair.x, pair.y))
      .sort((choiceA, choiceB) => choiceA.x - choiceB.x);
  }

  /**
   * Compares choices of this answer with some other choices. Expects that choices are sorted by x
   * @param choices
   */
  hasSameChoices(choices: EMIChoice[]): boolean {
    if (this.choices === null || this.choices === undefined || choices === null || choices === undefined) {
      return false;
    }
    if (choices.length !== this.choices.length) {
      return false;
    }
    for (let i = 0; i < choices.length; i++) {
      if (!this.choices[i].equals(choices[i])) {
        return false;
      }
    }
    return true;
  }

  wasAnswered(): boolean {
    return this.choices && this.choices.length > 0;
  }

  hasChoice(emiChoice: EMIChoice): boolean {
    return this.choices.some(choice => choice.equals(emiChoice));
  }
}
