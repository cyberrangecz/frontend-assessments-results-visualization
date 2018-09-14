import { Component, OnInit, Input } from '@angular/core';
import { FFQ } from '../../models/ffq';
import { FFQAnswer } from '../../models/ffqanswer';

@Component({
  selector: 'kypo2-viz-assessments-results-free-form-question-results',
  templateUrl: './free-form-question-results.component.html',
  styleUrls: ['./free-form-question-results.component.css']
})
export class FreeFormQuestionResultsComponent implements OnInit {

  @Input() FFQData: FFQ;

  questionTitle: string;
  answers: FFQAnswer[];
  order: number;

  constructor() { }

  ngOnInit() {
    this.questionTitle = this.FFQData.text;
    this.answers = this.FFQData.answers;
    this.order = this.FFQData.order;
  }

}
