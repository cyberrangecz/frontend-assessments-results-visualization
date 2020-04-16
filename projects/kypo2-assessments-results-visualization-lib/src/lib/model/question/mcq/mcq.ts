import { Question } from '../question';
import { MCQAnswer } from './mcq-answer';

/**
 * Class representing a multiple choice question
 *
 * For example:
 * MCQ - Select food that is considered fruit
 * options being: ['Tomato', 'Apple', 'Salad', 'Banana']
 * and correctChoices being: [1,3]
 *
 * The question can also be a questionnaire, not a test. Then correct choices are [] and correctness of answers is not evaluated
 */
export class MCQ extends Question {
  options: string[] = [];
  correctChoices: number[] = [];
  answers: MCQAnswer[];

  constructor(questionJSON, isTest: boolean) {
    super(questionJSON);
    this.type = 'MCQ';
    this.options = questionJSON.choices.sort((a, b) => a.order - b.order).map((choice) => choice.text);
    if (isTest) {
      this.correctChoices = questionJSON.choices
        .filter((choice) => choice.is_correct)
        .map((correctChoice) => correctChoice.order)
        .sort((a, b) => a - b);
    }
  }

  /**
   * Evaluates correctness of all associated answers
   */
  evaluateAnswers() {
    if (this.correctChoices.length > 0) {
      this.answers.forEach((answer) => {
        answer.isCorrect = answer.hasSameChoices(this.correctChoices);
      });
    }
  }

  /**
   * Calculates total share of the answer and returns result as percentage (number 0 - 100)
   * @param optionIndex index of a option which share should be calculated
   */
  calculateMatchingAnswersShare(optionIndex: number): number {
    if (this.answers.length <= 0) {
      return 0;
    }
    const matchingAnswers = this.filterAnswersByChoice(optionIndex);
    return (matchingAnswers.length / this.answers.length) * 100;
  }

  /**
   * Calculates total number of same answers
   * @param optionIndex index of a option which count should be calculated
   */
  calculateSameAnswersCount(optionIndex: number): number {
    return this.filterAnswersByChoice(optionIndex).length;
  }

  /**
   * Returns true if the choice is include in correct choices
   * @param choiceIndex index of a choice to compare
   */
  isCorrectAnswer(choiceIndex: number) {
    return this.correctChoices.find((correctIndex) => choiceIndex === correctIndex) !== undefined;
  }

  /**
   * Filters answers including selected choice
   * @param choiceIndex index of a choice to compare
   */
  filterAnswersByChoice(choiceIndex: number): MCQAnswer[] {
    return this.answers.filter((answer) => answer.hasMatchingChoice(choiceIndex));
  }
}
