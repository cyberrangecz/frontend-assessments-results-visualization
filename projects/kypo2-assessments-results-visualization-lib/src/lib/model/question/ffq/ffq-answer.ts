import {Answer} from '../answer';
import {User} from 'kypo2-auth';

export class FFQAnswer extends Answer {
  text: string;

  constructor(answerJSON, trainee: User) {
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

