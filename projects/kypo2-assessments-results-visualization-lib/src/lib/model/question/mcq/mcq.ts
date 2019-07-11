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
 // TODO: refactor with getter and inner map?
  calculateMatchingAnswersPercentage(optionToCalculate: string): number {
    const optionIndex = this.options.findIndex(option => option === optionToCalculate);
    const matchingAnswers =  this.filterAnswersByChoice(optionIndex);
    return (matchingAnswers.length / this.answers.length) * 100;
  }

  calculateSameAnswersCount(optionToCalculate: string) {
    const optionIndex = this.options.findIndex(option => option === optionToCalculate);
    const matchingAnswers = this.filterAnswersByChoice(optionIndex);
    return matchingAnswers.length;
  }

  isCorrectAnswer(choiceIndex: number) {
    return this.correctChoices.find(correctIndex => choiceIndex === correctIndex) !== undefined;
  }

  filterAnswersByChoice(choiceIndex: number): MCQAnswer[] {
    return this.answers.filter(answer => answer.hasMatchingAnswer(choiceIndex));
  }
}
