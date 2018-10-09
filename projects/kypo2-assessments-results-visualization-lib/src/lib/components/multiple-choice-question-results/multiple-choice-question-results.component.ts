import { Component, OnInit, Input } from '@angular/core';
import { MCQ } from '../../models/mcq';
import { MCQAnswer } from '../../models/mcqanswer';
import { MCQChoice } from '../../models/mcqchoice';
import { CountedAnswer } from './models/counted-answer.model';

@Component({
  selector: 'kypo2-viz-assessments-results-multiple-choice-question-results',
  templateUrl: './multiple-choice-question-results.component.html',
  styleUrls: ['./multiple-choice-question-results.component.css']
})
export class MultipleChoiceQuestionResultsComponent implements OnInit {

  @Input() MCQData: MCQ;

  questionTitle: string;
  answers: MCQAnswer[];
  order: number;
  choices: MCQChoice[];

  countedAnswers: CountedAnswer[];

  constructor() { }

  ngOnInit() {
    this.questionTitle = this.MCQData.text;
    this.answers = this.MCQData.answers;
    this.order = this.MCQData.order;
    this.choices = this.MCQData.choices.sort((choice: MCQChoice, choiceToBeCompared: MCQChoice) => choice.order - choiceToBeCompared.order);
    this.countAnswers();
  }

  countAnswers() {
    this.countedAnswers = (this.choices.slice() as any);

    this.countedAnswers.forEach((choice) => {
      choice.answers = [];
    });

    this.answers.forEach((answer: MCQAnswer) => {
      answer.choices.forEach((choiceOrder: number) => {
        this.countedAnswers.find(choice => choice.order === choiceOrder).answers.push(answer.userName);
      })
    });
  }

}
