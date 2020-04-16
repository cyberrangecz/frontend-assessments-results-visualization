import { User } from 'kypo2-auth';
import { Answer } from '../answer';
import { EMIChoice } from './emi-choice';

/**
 * Class representing an answer to a extended matching items question where choices are coordinates selected as correct by trainee
 */
export class EMIAnswer extends Answer {
  choices: EMIChoice[] = [];

  constructor(answerJSON, trainee: User) {
    super(trainee);
    this.choices = answerJSON.pairs
      .map((pair) => new EMIChoice(pair.x, pair.y))
      .sort((choiceA, choiceB) => choiceA.x - choiceB.x);
  }

  /**
   * Compares choices of this answer with other choices. Expects that choices are sorted by x
   * @param choices choices to compare
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

  /**
   * Returns true if at least one choice was selected, false otherwise
   */
  wasAnswered(): boolean {
    return this.choices && this.choices.length > 0;
  }

  /**
   * Returns true if answer has provided choice, false otherwise
   * @param emiChoice choice to compare
   */
  hasChoice(emiChoice: EMIChoice): boolean {
    return this.choices.some((choice) => choice.equals(emiChoice));
  }
}
