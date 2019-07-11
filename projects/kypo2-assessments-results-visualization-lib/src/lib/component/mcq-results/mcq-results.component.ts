import { Component, Input, OnInit} from '@angular/core';
import {MCQ} from '../../model/question/mcq/mcq';
import {D3Service} from 'd3-ng2-service';

@Component({
  selector: 'kypo2-viz-assessments-results-mcq',
  templateUrl: './mcq-results.component.html',
  styleUrls: ['./mcq-results.component.css']
})
export class MCQResultsComponent implements OnInit {

  @Input() question: MCQ;

  defaultNumberOfTicks = 15;
  defaultChartWidth = 250;

  constructor(private d3service: D3Service) {

  }

  ngOnInit() {
  }

  get ticks() {
    const totalAnswers = this.question.answers.length;
    if (totalAnswers < this.defaultNumberOfTicks) {
      return this.defaultNumberOfTicks;
    }
    const excess = (totalAnswers - this.defaultNumberOfTicks);
    const numberOfExtensions = Math.floor(excess / 5);
    return this.defaultNumberOfTicks + 5 * numberOfExtensions;
  }

  get chartWidth() {
    const totalAnswers = this.question.answers.length;
    if (totalAnswers < this.defaultNumberOfTicks) {
      return this.defaultChartWidth;
    }

    const excess = (totalAnswers - this.defaultNumberOfTicks);
    const numberOfExtensions = Math.floor(excess / 5);

    const d3 = this.d3service.getD3();
    const scale = d3.scaleLinear()
      .range([0, this.defaultChartWidth])
      .domain([0, this.defaultNumberOfTicks]);
    return this.defaultChartWidth + numberOfExtensions * scale(5);
  }

}
