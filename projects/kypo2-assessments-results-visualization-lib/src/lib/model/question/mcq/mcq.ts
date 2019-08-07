import {Question} from '../question';
import {MCQAnswer} from './mcq-answer';

export class MCQ extends Question {
  options: string[] = [];
  correctChoices: number[] = [];
  answers: MCQAnswer[];

  constructor(questionJSON, isTest: boolean) {
    super(questionJSON);
    this.type = 'MCQ';
    this.options = questionJSON.choices
      .sort((a, b) => a.order - b.order)
      .map(choice => choice.text);
    if (isTest) {
      this.correctChoices = questionJSON.choices
        .filter(choice => choice.is_correct)
        .map(correctChoice => correctChoice.order)
        .sort((a, b) => a - b);
    }
  }

  evaluateAnswers() {
    if (this.correctChoices.length > 0) {
      this.answers.forEach(answer => {
        answer.isCorrect = answer.hasSameChoices(this.correctChoices);
      });
    }
  }

  calculateMatchingAnswersPercentage(optionIndex: number): number {
    if (this.answers.length <= 0) {
      return 0;
    }
    const matchingAnswers =  this.filterAnswersByChoice(optionIndex);
    return (matchingAnswers.length / this.answers.length) * 100;
  }

  calculateSameAnswersCount(optionIndex: number): number {
    return this.filterAnswersByChoice(optionIndex).length;
  }

  isCorrectAnswer(choiceIndex: number) {
    return this.correctChoices.find(correctIndex => choiceIndex === correctIndex) !== undefined;
  }

  filterAnswersByChoice(choiceIndex: number): MCQAnswer[] {
    return this.answers.filter(answer => answer.hasMatchingAnswer(choiceIndex));
  }
}
