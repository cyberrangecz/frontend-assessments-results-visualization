import { Component, OnInit, Input } from '@angular/core';
import { EMI } from '../../models/emi';
import { EMIAnswer } from '../../models/emianswer';
import { EMIChoice } from '../../models/emichoice';
import { CountedAnswer } from '../multiple-choice-question-results/models/counted-answer.model';

@Component({
  selector: 'kypo2-viz-assessments-results-extended-matching-results',
  templateUrl: './extended-matching-results.component.html',
  styleUrls: ['./extended-matching-results.component.css']
})
export class ExtendedMatchingResultsComponent implements OnInit {

  @Input() EMIData: EMI;
  
  questionTitle: string;
  answers: EMIAnswer[];
  order: number;
  choices: EMIChoice[];
  firstChoices: EMIChoice[];
  secondChoices: EMIChoice[];

  answersCount;
  countedAnswers: CountedAnswer[];

  constructor() { }

  ngOnInit() {
    this.questionTitle = this.EMIData.text;
    this.answers = this.EMIData.answers;
    this.order = this.EMIData.order;
    this.choices = this.EMIData.choices;
    this.firstChoices = this.EMIData.choices.slice(0, this.EMIData.choices.length/2);
    this.secondChoices = this.EMIData.choices.slice(this.EMIData.choices.length/2, this.EMIData.choices.length);
    this.countAnswers();
    this.convertToCountedAnswerFormat();
  }

  countAnswers() {
    this.initializeAnswersCount();
    this.answers.forEach((answer: EMIAnswer) => {
      answer.pairs.forEach(pair => {
        const firstChoice = pair[0];
        const secondChoice = pair[1];
        this.answersCount[firstChoice][secondChoice].push(answer.userName);
      })
    });
  }

  initializeAnswersCount() {
    this.answersCount = {};
    this.firstChoices.forEach((first: EMIChoice) => {
      this.answersCount[first.order] = {};
      this.secondChoices.forEach((second: EMIChoice) => {
        this.answersCount[first.order][second.order] = [];
      });
    });
  }

  convertToCountedAnswerFormat() {
    this.countedAnswers = [];
    this.firstChoices.forEach((first: EMIChoice) => {
      (this.countedAnswers[first.order] as any) = [];
      this.secondChoices.forEach((second: EMIChoice) => {
        const newPair = {
          order: second.order,
          text: second.text,
          isCorrect: +first.order === +second.pair,
          answers: this.answersCount[first.order][second.order]
        };
        (this.countedAnswers[first.order] as any).push(newPair);
      });
    });
  }

}
