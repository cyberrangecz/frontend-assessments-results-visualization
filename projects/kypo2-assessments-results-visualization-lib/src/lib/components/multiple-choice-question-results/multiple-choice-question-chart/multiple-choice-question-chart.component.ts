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
  @Input() countedAnswers;

  private d3: D3;
  private svgElement: Selection<BaseType, {}, null, undefined>;
  private xScale;
  private yScale;

  constructor(private d3service: D3Service) {
    this.d3 = this.d3service.getD3();
   }

  ngOnInit() {
    this.createSvg();
    this.initializeScales();
    this.createChart();
  }

  createSvg() {
    const containerElement = this.chartContainer.nativeElement;
    this.svgElement = this.d3.select(containerElement).append('svg')
      .attr('width', this.options.width + this.options.margin.left + this.options.margin.right)
      .attr('height', this.options.height + this.options.margin.top + this.options.margin.bottom)
      .append('g')
      .attr('transform', `translate(${ this.options.margin.left }, ${ this.options.margin.top })`);
    // Debug purpose
    this.svgElement.append('rect')
      .attr('height', this.options.height)
      .attr('width', this.options.width)
      .attr('fill', 'none')
      .attr('stroke', 'lightgrey');
  }

  initializeScales() {
    this.yScale = this.d3.scaleBand()
      .range([0, this.options.height])
      .domain(this.choices.map(choice => choice.order.toString()))
      .padding(0.2);

    const totalAnswers = this.answers.length;

    this.xScale = this.d3.scaleLinear()
      .range([0, this.options.width * 0.8]) // To separate variable
      .domain([0, totalAnswers]);
  }

  createChart() {    
    this.highlightCorrectAnswers();
    this.createAxes();
    this.createCircles();
    this.createStats();
  }

  createAxes() {
    this.svgElement.append('g')
      .attr('transform', `translate(0, ${ this.options.height })`)
      .call(this.d3.axisBottom(this.xScale));

    this.svgElement.append('g')
      .attr('transform', `translate(0, 0)`)
      .call(this.d3.axisLeft(this.yScale));
  }

  highlightCorrectAnswers() {
    const circleRadius = this.xScale(1)/2 < this.yScale.bandwidth()/2 ? this.xScale(1)/2 : this.yScale.bandwidth()/2;
    this.countedAnswers.forEach(choice => {
      if (!choice.isCorrect) return;

      this.svgElement.append('rect')
        .attr('x', this.xScale(1) - circleRadius - 10)
        .attr('y', this.yScale(choice.order))
        .attr('rx', circleRadius)
        .attr('width', this.xScale(choice.answers.length-1) + 2*circleRadius + 10*2)
        .attr('height', this.yScale.bandwidth())
        .attr('fill', '#EDC455');
    });
  }

  createCircles() {
    const circleRadius = this.xScale(1)/2 < this.yScale.bandwidth()/2 ? this.xScale(1)/2 : this.yScale.bandwidth()/2;

    this.countedAnswers.forEach(choice => {
      this.svgElement.selectAll('.player choice-order-' + choice.order)
        .data(choice.answers)
        .enter()
        .append('circle')
        .attr('class', 'player')
        .attr('cx', (userName, i) => this.xScale(i + 1))
        .attr('cy', this.yScale(choice.order) + this.yScale.bandwidth()/2) // Align to center
        .attr('r', circleRadius);
    });
  }

  createStats() {
    this.svgElement.append('text')
      .attr('x', this.options.width * 0.8)
      .attr('y', 0)
      .html('Σ');

    this.svgElement.selectAll('.sum')
      .data(this.countedAnswers)
      .enter()
      .append('text')
      .attr('class', 'sum')
      .attr('x', this.options.width * 0.8)
      .attr('y', (choice: any) => this.yScale(choice.order.toString()) + this.yScale.bandwidth()/2)
      .html((choice:any) => choice.answers.length);

    this.svgElement.append('text')
      .attr('x', this.options.width * 0.9)
      .attr('y', 0)
      .html('%');

    this.svgElement.selectAll('.percentage')
      .data(this.countedAnswers)
      .enter()
      .append('text')
      .attr('class', 'percentage')
      .attr('x', this.options.width * 0.9)
      .attr('y', (choice: any) => this.yScale(choice.order.toString()) + this.yScale.bandwidth()/2)
      .html((choice:any) => (choice.answers.length / this.answers.length * 100).toString() + ' %');
  }
}
