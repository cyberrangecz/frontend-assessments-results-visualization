import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, Input } from '@angular/core';
import { D3, D3Service, BaseType, Selection } from 'd3-ng2-service';
import { MCQChoice } from '../../../models/mcqchoice';
import { MCQAnswer } from '../../../models/mcqanswer';

@Component({
  selector: 'kypo2-viz-assessments-mci-chart',
  template: '<div #chart></div>',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./multiple-choice-question-chart.component.css']
})
export class MultipleChoiceQuestionChartComponent implements OnInit {

  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() answers: any;
  @Input() options: any;
  @Input() choices: MCQChoice[];
  @Input() questionTitle: string;

  private d3: D3;
  private svgElement: Selection<BaseType, {}, null, undefined>;

  constructor(private d3service: D3Service) {
    this.d3 = this.d3service.getD3();
   }

  ngOnInit() {
    this.createSvg();
    this.createBars();
  }

  createSvg() {
    const containerElement = this.chartContainer.nativeElement;
    this.svgElement = this.d3.select(containerElement).append('svg')
      .attr('width', this.options.width + this.options.margin.left + this.options.margin.right)
      .attr('height', this.options.height + this.options.margin.top + this.options.margin.bottom)
      .append('g')
      .attr('transform', `translate(${ this.options.margin.left }, ${ this.options.margin.top })`);
  }

  createBars() {

    const maxCountAnswers = Math.max(...Object.values(this.answers).map((array: Array<string>) => array.length));

    const yScale = this.d3.scaleBand()
      .range([0, this.options.height])
      .domain(this.choices.map((choice: MCQChoice) => choice.order.toString()))
      .padding(0.2);

    const xScale = this.d3.scaleLinear()
      .range([0, this.options.width])
      .domain([0, maxCountAnswers]);

    const object = Object.keys(this.answers).map(key => {return {order: key, count: this.answers[key].length}});

    this.svgElement.selectAll('.bar')
      .data(object)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('width', (choice) => xScale(choice.count))
      .attr('y', choice => yScale(choice.order))
      .attr('height', yScale.bandwidth());

  }

}
