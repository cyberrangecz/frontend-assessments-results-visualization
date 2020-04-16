import { User } from 'kypo2-auth';
import { Answer } from '../answer';

/**
 * Class representing an answer to a free form question
 */
export class FFQAnswer extends Answer {
  text: string;

  constructor(answerJSON, trainee: User) {
    super(trainee);
    this.text = answerJSON.text;
  }

  /**
   * Compares answer text with provided text. Returns true if matching, false otherwise. Compares in lowercase without whitespaces
   * @param otherText text to compare with answer
   */
  hasSameText(otherText: string): boolean {
    return this.text.toLowerCase().trim() === otherText.toLowerCase().trim();
  }

  /**
   * True if answered, false otherwise (whitespace is not considered an answer)
   */
  wasAnswered(): boolean {
    return this.text && this.text.trim().length > 0;
  }
}
