import { Component, OnInit, Input } from '@angular/core';
import { EMI } from '../../models/emi';
import { EMIAnswer } from '../../models/emianswer';

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

  constructor() { }

  ngOnInit() {
    this.questionTitle = this.EMIData.text;
    this.answers = this.EMIData.answers;
    this.order = this.EMIData.order;
  }

}
