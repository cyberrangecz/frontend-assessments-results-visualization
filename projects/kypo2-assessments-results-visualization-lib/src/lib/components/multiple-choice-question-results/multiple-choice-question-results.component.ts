import { Component, OnInit, Input } from '@angular/core';
import { MCQ } from '../../models/mcq';
import { MCQAnswer } from '../../models/mcqanswer';
import { MCQChoice } from '../../models/mcqchoice';

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

  answersCount: any;

  constructor() { }

  ngOnInit() {
    this.questionTitle = this.MCQData.text;
    this.answers = this.MCQData.answers;
    this.order = this.MCQData.order;
    this.choices = this.MCQData.choices;
    this.countAnswers();
  }

  countAnswers() {
    this.initializeAnswersCount();
    
    this.answers.forEach((answer: MCQAnswer) => {
      answer.choices.forEach((choice: number) => {
        this.answersCount[choice].push(answer.userName);
      });
    });
  }

  initializeAnswersCount() {
    this.answersCount = {};
    const correctChoices: MCQChoice[] = this.choices;
    correctChoices.forEach((answer: MCQChoice) => {
      this.answersCount[answer.order] = [];
    });
  }

}
