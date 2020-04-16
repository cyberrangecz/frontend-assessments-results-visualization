import { User } from 'kypo2-auth';

/**
 * Abstract class representing answer of a question in assessment level
 */
export abstract class Answer {
  trainee: User;
  isCorrect: boolean;
  isHighlighted: boolean;

  protected constructor(trainee: User) {
    this.trainee = trainee;
  }

  /**
   * Returns true, if answer was answered (no matter the correctness), false otherwise
   */
  abstract wasAnswered(): boolean;

  /**
   * Highlights the answer if the answer is associated with provided trainee
   * @param trainee trainee to highlight
   */
  tryHighlight(trainee: User) {
    this.isHighlighted = this.trainee.equals(trainee);
  }

  /**
   * Stops being highlighted
   */
  clearHighlight() {
    this.isHighlighted = false;
  }
}
