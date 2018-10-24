import { Component, OnInit, Input } from '@angular/core';
import { MCQ } from '../../models/mcq';
import { MCQAnswer } from '../../models/mcqanswer';
import { MCQChoice } from '../../models/mcqchoice';
import { CountedAnswer } from './models/counted-answer.model';
import { D3Service } from 'd3-ng2-service';

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

  defaultNumberOfTicks = 15;
  defaultChartWidth = 400;

  constructor(private d3service: D3Service) { }

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

  get ticks() {
    const totalAnswers = this.answers.length;
    if (totalAnswers < this.defaultNumberOfTicks) return this.defaultNumberOfTicks;

    const excess = (totalAnswers - this.defaultNumberOfTicks);
    const numberOfExtensions = Math.floor(excess / 5);
    const totalTicks = this.defaultNumberOfTicks + 5 * numberOfExtensions;

    return totalTicks;
  }

  get chartWidth() {
    const totalAnswers = this.answers.length;
    if (totalAnswers < this.defaultNumberOfTicks) return this.defaultChartWidth;

    const excess = (totalAnswers - this.defaultNumberOfTicks);
    const numberOfExtensions = Math.floor(excess / 5);

    const d3 = this.d3service.getD3();
    const scale = d3.scaleLinear()
      .range([0, this.defaultChartWidth])
      .domain([0, this.defaultNumberOfTicks]);
    const width = this.defaultChartWidth + numberOfExtensions * scale(5);
    return width;
  }

}
