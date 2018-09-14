import { Component, OnInit, Input } from '@angular/core';
import { MCQ } from '../../models/mcq';
import { MCQAnswer } from '../../models/mcqanswer';

@Component({
  selector: 'kypo2-viz-assessments-results-multiple-choice-question-results',
  templateUrl: './multiple-choice-question-results.component.html',
  styleUrls: ['./multiple-choice-question-results.component.css']
})
export class MultipleChoiceQuestionResultsComponent implements OnInit {

  @Input() MCQData: MCQ;

  questionTitle: string;
  answers: MCQAnswer[];

  constructor() { }

  ngOnInit() {
    this.questionTitle = this.MCQData.text;
    this.answers = this.MCQData.answers;
  }

}
