import { Question } from '../question';
import { MCQAnswer } from './mcq-answer';
import { QuestionDTO } from '../../dto/question-dto';

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
  correctChoices: string[] = [];
  answers: MCQAnswer[];

  constructor(questionDTO: QuestionDTO, isTest: boolean) {
    super(questionDTO);
    this.type = 'MCQ';
    this.options = questionDTO.choices.sort((a, b) => a.order - b.order).map((choice) => choice.text);
    if (isTest) {
      this.correctChoices = questionDTO.choices
        .filter((choice) => choice.correct)
        .map((correctChoice) => correctChoice.text);
    }
  }

  /**
   * Evaluates correctness of all associated answers
   */
  evaluateAnswers(): void {
    if (this.correctChoices.length > 0) {
      this.answers.forEach((answer) => {
        answer.isCorrect = answer.hasSameChoices(this.correctChoices);
      });
    }
  }

  /**
   * Calculates total share of the answer and returns result as percentage (number 0 - 100)
   * @param option content of the option which share should be calculated
   */
  calculateMatchingAnswersShare(option: string): number {
    if (this.answers.length <= 0) {
      return 0;
    }
    const matchingAnswers = this.filterAnswersByChoice(option);
    return (matchingAnswers.length / this.answers.length) * 100;
  }

  /**
   * Calculates total number of same answers
   * @param option context of the option which count should be calculated
   */
  calculateSameAnswersCount(option: string): number {
    return this.filterAnswersByChoice(option).length;
  }

  /**
   * Returns true if the choice is include in correct choices
   * @param choice content of the choice choice to compare
   */
  isCorrectAnswer(choice: string): boolean {
    return this.correctChoices.find((correctChoice) => choice === correctChoice) !== undefined;
  }

  /**
   * Filters answers including selected choice
   * @param choice content of the choice to compare
   */
  filterAnswersByChoice(choice: string): MCQAnswer[] {
    return this.answers.filter((answer) => answer.hasMatchingChoice(choice));
  }
}
