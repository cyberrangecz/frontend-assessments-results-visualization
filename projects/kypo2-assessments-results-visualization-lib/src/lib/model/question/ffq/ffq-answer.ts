import {Answer} from '../answer';
import {Trainee} from '../../trainee';

export class FFQAnswer extends Answer {
  text: string;

  constructor(answerJSON, trainee: Trainee) {
    super(trainee);
    this.text = answerJSON.text;
  }

  hasSameText(otherText: string): boolean {
    return this.text.toLowerCase().trim() === otherText.toLowerCase().trim();
  }

  wasAnswered(): boolean {
    return this.text && this.text.trim().length > 0;
  }
}

