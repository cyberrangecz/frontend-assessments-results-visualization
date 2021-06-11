import { Trainee } from '../../trainee/trainee';
import { Answer } from '../answer';

/**
 * Class representing an answer to a multiple choice question where traineeChoices are indexes of options selected as correct by trainee
 */
export class MCQAnswer extends Answer {
  traineeChoices: string[] = [];

  constructor(answerJSON: any, trainee: Trainee) {
    super(trainee);
    this.traineeChoices = answerJSON.answers;
  }

  /**
   * Compares trainees choices in this answer with provided answers. True if they are matching, false otherwise
   * @param choices choices to compare with the answer
   */
  hasSameChoices(choices: string[]): boolean {
    if (
      this.traineeChoices === null ||
      this.traineeChoices === undefined ||
      choices === null ||
      choices === undefined
    ) {
      return false;
    }
    if (this.traineeChoices.length !== choices.length) {
      return false;
    }
    for (let i = 0; i < this.traineeChoices.length; i++) {
      if (this.traineeChoices[i] !== choices[i]) {
        return false;
      }
    }
    return true;
  }

  /**
   * True if the answer was answered, false otherwise
   */
  wasAnswered(): boolean {
    return this.traineeChoices && this.traineeChoices.length > 0;
  }

  /**
   * True if at least one choice selected as answer is same as the one provided, false otherwise
   * @param choiceIndex index of a choice to match
   */
  hasMatchingChoice(choice: string): boolean {
    return this.traineeChoices.filter((userChoice) => userChoice === choice).length > 0;
  }
}
