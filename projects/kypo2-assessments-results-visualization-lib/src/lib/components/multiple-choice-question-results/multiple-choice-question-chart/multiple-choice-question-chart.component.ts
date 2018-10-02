import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, Input, OnDestroy } from '@angular/core';
import { D3, D3Service, BaseType, Selection } from 'd3-ng2-service';
import { MCQChoice } from '../../../models/mcqchoice';
import { EventsService } from '../../../services/events.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'kypo2-viz-assessments-mci-chart',
  template: '<div #chart></div>',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./multiple-choice-question-chart.component.css']
})
export class MultipleChoiceQuestionChartComponent implements OnInit, OnDestroy {

  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() answers: any;
  @Input() options: any;
  @Input() questionTitle: string;
  @Input() countedAnswers;

  private d3: D3;
  private svgElement: Selection<BaseType, {}, null, undefined>;
  private xScale;
  private yScale;
  private tooltip = null;

  private playerClicked: Subscription;
  private containerClicked: Subscription;

  constructor(private d3service: D3Service, private eventsService: EventsService) {
    this.d3 = this.d3service.getD3();
    this.subscribeToEvents();
   }

  subscribeToEvents() {
    this.playerClicked = this.eventsService.playerClicked$.subscribe(
    (userName: string) => {
      if (this.d3.event != null) {
        this.d3.event.stopPropagation();
      }
      this.unhighlightPlayer();
      this.highlightPlayer(userName);
    });

    this.containerClicked = this.eventsService.containerClicked$.subscribe(
      () => {
        this.unhighlightPlayer();
      }
    );
  }

  ngOnDestroy() {
    this.playerClicked.unsubscribe();
    this.containerClicked.unsubscribe();
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
  }

  initializeScales() {
    this.yScale = this.d3.scaleBand()
      .range([0, this.options.height])
      .domain(this.countedAnswers.map(choice => choice.order.toString()))
      .padding(0.2);

    const totalAnswers = this.answers.length;

    this.xScale = this.d3.scaleLinear()
      .range([0, this.options.chart.width]) // To separate variable
      .domain([0, totalAnswers]);
  }

  createChart() {    
    this.createGridLines();
    this.highlightCorrectAnswers();
    this.createAxes();
    this.createCircles();
    this.createStats();
    this.createTooltips();
    this.addEvents();
  }

  createAxes() {
    this.createXAxis();
    this.createYAxis();
  }

  createXAxis() {
    const xAxis = this.d3.axisBottom(this.xScale);

    xAxis.tickValues(this.getTicksEveryFiveAnswers());
    xAxis.tickFormat(this.d3.format("d"));
    xAxis.tickSize(0);
    xAxis.tickPadding(this.options.margin.bottom/3);

    this.svgElement.append('g').attr('class', 'x-axis')
      .attr('transform', `translate(0, ${ this.options.height })`)
      .call(xAxis);
  }

  createYAxis() {
    const yAxis = this.d3.axisLeft(this.yScale)

    yAxis.tickPadding(this.options.margin.left/3);
    yAxis.tickSize(0);
    yAxis.tickFormat((tickValue) => {
      const codeShift = +tickValue + 65; // To start of the alphabet
      return String.fromCharCode(codeShift);
    });
    const axisGroup = this.svgElement.append('g').attr('class', 'y-axis')
      .attr('transform', `translate(0, 0)`)
      .call(yAxis);
    
    const x = +axisGroup.select('text').attr('x') - 6;
    const dy = axisGroup.select('text').attr('dy');
    
    axisGroup.selectAll('g')
      .filter((choice: number) => {
        const choices: MCQChoice[] = this.countedAnswers;
        const find = choices.find((a: MCQChoice) => +a.order === +choice);
        return find.isCorrect;})
      .insert('circle', ':nth-child(2)')
      .attr('class', 'choice-highlight')
      .attr('cx', x)
      .attr('cy', 0)
      .attr('r', 20);
  }

  getTicksEveryFiveAnswers(): Array<number> {
    const tickValues = [];
    for (let i = 0; i <= this.answers.length; i += 5) {
      tickValues.push(i);
    }
    return tickValues;
  }

  createGridLines() {
    const verticalGridLines = this.d3.axisTop(this.xScale)
      .tickValues(this.getTicksEveryFiveAnswers())
      .tickFormat(() => '')
      .tickSize(-this.options.height);

    this.svgElement.append('g')
      .attr('class', 'grid-lines')
      .call(verticalGridLines);
  }

  highlightCorrectAnswers() {
    const circleRadius = this.getCircleRadius();
    this.countedAnswers.forEach(choice => {
      if (!choice.isCorrect) return;

      const padding = 3;

      this.svgElement.append('g').attr('class', 'bar-highlighted')
        .append('rect')
        .attr('x', this.xScale(1) - 2*circleRadius - padding)
        .attr('y', this.yScale(choice.order))
        .attr('rx', circleRadius)
        .attr('width', this.xScale(choice.answers.length-1) + 2*circleRadius + padding*2)
        .attr('height', this.yScale.bandwidth());
    });
  }

  getCircleRadius() {
    let circleRadius = this.xScale(1)/2 < this.yScale.bandwidth()/2 ? this.xScale(1)/2 : this.yScale.bandwidth()/2;
    circleRadius *= 0.9;
    return circleRadius;
  }

  createCircles() {
    const circleRadius = this.getCircleRadius();

    this.countedAnswers.forEach(choice => {
      this.svgElement.selectAll('.player choice-order-' + choice.order)
        .data(choice.answers)
        .enter()
        .append('circle')
        .attr('class', (userName) => 'player player-' + userName)
        .attr('cx', (userName, i) => this.xScale(i + 1) - circleRadius)
        .attr('cy', this.yScale(choice.order) + this.yScale.bandwidth()/2) // Align to center
        .attr('r', circleRadius);
    });
  }

  createStats() {
    this.createSumColumn();
    this.createPercentageColumn();
  }

  createSumColumn() {
    const sumColumn = this.svgElement.append('g').attr('class', 'sum-column');

    sumColumn.append('text').attr('class', 'sum-label')
      .attr('x', this.options.chart.width + this.options.stats.sum.marginLeft)
      .attr('y', 0)
      .html('Σ');

    sumColumn.selectAll('.sum-value')
      .data(this.countedAnswers)
      .enter()
      .append('text')
      .attr('class', 'sum-value')
      .attr('x', this.options.chart.width + this.options.stats.sum.marginLeft)
      .attr('y', (choice: any) => this.yScale(choice.order.toString()) + this.yScale.bandwidth()/2)
      .html((choice:any) => choice.answers.length);
  }

  createPercentageColumn() {
    const percentageColumn = this.svgElement.append('g').attr('class', 'percentage-column');
  
    const x = this.options.chart.width + this.options.stats.sum.marginLeft + this.options.stats.percentage.marginLeft;

    percentageColumn.append('text').attr('class', 'percentage-label')
    .attr('x', x)
    .attr('y', 0)
    .html('%');

    percentageColumn.selectAll('.percentage-value')
      .data(this.countedAnswers)
      .enter()
      .append('text')
      .attr('class', 'percentage-value')
      .attr('x', x)
      .attr('y', (choice: any) => this.yScale(choice.order.toString()) + this.yScale.bandwidth()/2)
      .html((choice:any) => (choice.answers.length / this.answers.length * 100).toFixed(1).toString());
  }

  createTooltips() {
    this.createPlayerTooltip();
    this.createChoiceTooltip();
  }

  createPlayerTooltip() {
    const players = this.svgElement.selectAll('.player');

    players.on('mouseover', (playerName: string, i, sel) => {
      const selection = this.d3.select(sel[i]);
      const node = selection.node();
      this.createTooltip(node, playerName);
    });

    players.on('mouseout', () => {this.hideTooltip();});
  }

  createChoiceTooltip() {
    this.disablePointerEventsForIncorrectAnswers();
    const choiceTicks = this.svgElement.selectAll('.y-axis > .tick');
    choiceTicks.on('mouseover', (tickOrder: number, i, selection) => {
      const choiceData: MCQChoice = this.countedAnswers.find(answer => +answer.order === +tickOrder);
      const choiceTitle = choiceData.text;
      const node: BaseType = this.d3.select(selection[i]).select('text').node(); // Center tooltip to the <text> element
      this.createTooltip(node, choiceTitle, {top: 10, left: 0});
    });
    choiceTicks.on('mouseout', () => {this.hideTooltip();});
  }

  disablePointerEventsForIncorrectAnswers() {
    this.svgElement.selectAll('.y-axis > .tick > text')
    .filter((order: number) => {
      const answer = this.countedAnswers.find((answer) => +answer.order === +order);
      return answer.isCorrect;
    })
    .style('pointer-events', 'none');
  }

  createTooltip(node: BaseType, content, offset?) {
    if (offset == null) {
      offset = {top: 0, left: 0}
    };

    const playerBoundingRect: DOMRect = (node as any).getBoundingClientRect();
    
    let top = playerBoundingRect.top + window.scrollY - offset.top;
    let left = playerBoundingRect.left + window.scrollX - offset.left;

    this.tooltip = this.d3.select('body')
      .append('div')
      .attr('class', 'player-tooltip')
      .style('top',  top + 'px')
      .style('left', left + 'px');
    
    this.tooltip
      .style('opacity', 0)
      .html(content)
      .transition()
      .duration(200)
      .style('opacity', 1);

    const tooltipBoundingRect =  (this.tooltip.node() as any).getBoundingClientRect();
    const tooltipCenterOffset = tooltipBoundingRect.width/2 - playerBoundingRect.width/2;
    left -= tooltipCenterOffset;
    top -= tooltipBoundingRect.height + 10; // 10 matches arrow size
    this.tooltip.style('left', left + 'px');
    this.tooltip.style('top', top + 'px');
  }

  hideTooltip() {
    if (this.tooltip == null) return;
    this.tooltip.remove();
    this.tooltip = null;
  }

  addEvents() {
    this.addContainerEvents();
    this.addPlayerEvents();
  }

  addContainerEvents() {
    this.d3.select(this.chartContainer.nativeElement)
      .on('click', () => {
        this.eventsService.clickOnContainer();
    });
  }

  addPlayerEvents() {
    this.svgElement.selectAll('.player')
      .on('click', (userName: string) => {
        this.eventsService.clickOnPlayer(userName);
    });
  }

  highlightPlayer(userName) {
    const transition = this.d3.transition().duration(700).ease(this.d3.easeElasticOut);
    this.svgElement.selectAll('.player-' + userName)
      .classed('player-highlighted', true)
      .transition(transition)
      .attr('r', this.getCircleRadius() * 1.2);
  }

  unhighlightPlayer() {
    const transition = this.d3.transition().duration(700).ease(this.d3.easeElasticOut);
    this.svgElement.selectAll('.player')
      .classed('player-highlighted', false)
      .transition(transition)
      .attr('r', this.getCircleRadius());
  }

}
