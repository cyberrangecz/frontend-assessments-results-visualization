import { Trainee } from '../trainee/trainee';

/**
 * Abstract class representing answer of a question in assessment level
 */
export abstract class Answer {
  trainee: Trainee;
  isCorrect: boolean;
  isHighlighted: boolean;

  protected constructor(trainee: Trainee) {
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
  tryHighlight(trainee: Trainee) {
    this.isHighlighted = this.trainee.id === trainee.id;
  }

  /**
   * Stops being highlighted
   */
  clearHighlight() {
    this.isHighlighted = false;
  }
}
