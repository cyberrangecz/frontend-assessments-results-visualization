import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
  Input,
  OnDestroy
} from '@angular/core';
import {
  D3,
  D3Service,
  BaseType,
  Selection,
  ScaleLinear,
  ScaleBand
} from 'd3-ng2-service';
import {
  MCQChoice
} from '../../../models/mcqchoice';
import {
  EventsService
} from '../../../services/events.service';
import {
  Subscription
} from 'rxjs';
import {
  CountedAnswer
} from '../models/counted-answer.model';

@Component({
  selector: 'kypo2-viz-assessments-mci-chart',
  template: '<div id="chart-container" #chart></div>',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./multiple-choice-question-chart.component.css']
})
export class MultipleChoiceQuestionChartComponent implements OnInit, OnDestroy {

  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() answers: any;
  @Input() options: any;
  @Input() questionTitle: string;
  @Input() countedAnswers: CountedAnswer[];

  private d3: D3;
  private svgElement: Selection<BaseType, {}, null, undefined>;
  private xScale: ScaleLinear<number, number>;
  private yScale: ScaleBand<string>;
  private tooltip: Selection<BaseType, {}, HTMLElement, any> = null;

  private playerClicked: Subscription;
  private containerClicked: Subscription;

  constructor(private d3service: D3Service, private eventsService: EventsService) {
    this.d3 = this.d3service.getD3();
    this.subscribeToEvents();
  }

  /**
   * Subscribe to user events and handle them
   */
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

  /**
   * Unsubscribing prevents memory leaks
   */
  ngOnDestroy() {
    this.playerClicked.unsubscribe();
    this.containerClicked.unsubscribe();
  }

  ngOnInit() {
    this.initializeScales();
    this.createSvg();
    this.createChart();
  }

  /**
   * Add main SVG element to the chart's container. Add margin according to D3's convention.
   */
  createSvg() {
    const containerElement = this.chartContainer.nativeElement;
    this.svgElement = this.d3.select(containerElement).append('svg')
      .attr('width', this.options.width + this.options.margin.left + this.options.margin.right)
      .attr('height', this.options.height + this.options.margin.top + this.options.margin.bottom)
      .append('g')
      .attr('transform', `translate(${this.options.margin.left}, ${this.options.margin.top})`);
  }

  /**
   * Initialize main vertical and horizontal scale
   */
  initializeScales() {
    this.yScale = this.d3.scaleBand()
      .range([0, this.options.height])
      .domain(this.countedAnswers.map(choice => choice.order.toString()))
      .padding(0.2);

    this.xScale = this.d3.scaleLinear()
      .range([0, this.options.chart.width])
      .domain([0, this.options.ticks]);
  }

  createChart() {
    this.createGridLines();
    this.createAxes();
    this.highlightCorrectAnswers();
    this.createCircles();
    this.createStats();
    this.createTooltips();
    this.addEvents();
  }

  /**
   * Create axes if needed (EMI shows bottom axis only in the last chart)
   */
  createAxes() {
    if (this.options.axes.showBottomLabel) {
      this.createXAxis();
    }
    this.createYAxis();
  }

  createXAxis() {
    const xAxis = this.d3.axisBottom(this.xScale);

    xAxis.tickValues(this.getTicksEveryFiveAnswers());
    xAxis.tickFormat(this.d3.format("d"));
    xAxis.tickSize(0);
    xAxis.tickPadding(this.options.margin.bottom / 3);

    this.svgElement.append('g').attr('class', 'x-axis')
      .attr('transform', `translate(0, ${this.options.height})`)
      .call(xAxis);
  }

  /**
   * Create [0, 5, 10, ..., total_answers] array for d3.tickValues
   */
  getTicksEveryFiveAnswers(): Array<number> {
    const tickValues = [];
    for (let i = 0; i <= this.options.ticks; i += 5) {
      tickValues.push(i);
    }
    return tickValues;
  }

  createYAxis() {
    const yAxis = this.d3.axisLeft(this.yScale)

    const tickPadding = 30;
    yAxis.tickPadding(tickPadding);
    yAxis.tickSize(0);

    yAxis.tickFormat((tickValue) => {
      const answer = this.countedAnswers.find((answer) => +answer.order === +tickValue);
      const text: string = answer.text;
      const textElement = this.svgElement.append('text').style('font-size', '20px').html(text);
      const textLength = (textElement.node() as SVGTSpanElement).getComputedTextLength();
      textElement.remove();

      const textFitsTheSpace: boolean = textLength < this.options.margin.left - tickPadding;
      if (textFitsTheSpace) {
        return answer.text;
      } else { // Map to A-Z
        const codeShift = +tickValue + 65; // To start of the alphabet
        return String.fromCharCode(codeShift);
      }

    });

    this.svgElement.append('g').attr('class', 'y-axis')
      .attr('transform', `translate(0, 0)`)
      .call(yAxis);
  }

  /**
   * Create a vertical line for every horizontal axis tick
   */
  createGridLines() {
    const verticalGridLines = this.d3.axisTop(this.xScale)
      .tickValues(this.getTicksEveryFiveAnswers())
      .tickFormat(() => '')
      .tickSize(-this.options.height);

    this.svgElement.append('g')
      .attr('class', 'grid-lines')
      .call(verticalGridLines);
  }

  /**
   * Highlight the correct choices and players who answered correctly
   */
  highlightCorrectAnswers() {
    this.highlightCorrectCircles();
    this.highlightCorrectChoices();
  }

  highlightCorrectCircles() {
    const circleRadius = this.getCircleRadius();
    const padding = 3; // Side padding
    this.countedAnswers.forEach(choice => {
      if (!choice.isCorrect) return;

      this.svgElement.append('g')
        .attr('class', 'bar-highlighted')
        .append('rect')
        .attr('x', this.xScale(1) - 2 * circleRadius - padding)
        .attr('y', this.yScale(choice.order.toString()))
        .attr('rx', circleRadius)
        .attr('width', this.xScale(choice.answers.length - 1) + 2 * circleRadius + padding * 2)
        .attr('height', this.yScale.bandwidth());
    });
  }

  /**
   * Draw a rect underneath the <text> element of the correct choice
   */
  highlightCorrectChoices() {
    const rectHighlightPadding = 15;

    this.svgElement.selectAll('.y-axis > g')
      .filter((choice: number) => {
        const choices: MCQChoice[] = this.countedAnswers;
        const find = choices.find((a: MCQChoice) => +a.order === +choice);
        return find.isCorrect;
      })
      .insert('rect', ':nth-child(2)')
      .each((choice, i, nodes) => {
        const rectNode = nodes[i] as any;
        const parentNode = rectNode.parentNode;
        const textElement = this.d3.select(parentNode).select('text');
        const x = +textElement.attr('x') - rectHighlightPadding;
        const y = +textElement.attr('y') - rectHighlightPadding;
        const boundingRect = (textElement.node() as any).getBoundingClientRect();
        const height = boundingRect.height + rectHighlightPadding;
        const width = boundingRect.width + rectHighlightPadding;
        const translate = `translate(${-width + rectHighlightPadding * 1.5}, ${-height / 2 + rectHighlightPadding})`;
        const rectSelection = this.d3.select(rectNode);

        rectSelection.attr('x', x)
          .attr('y', y)
          .attr('width', width)
          .attr('height', height)
          .attr('transform', translate)
          .attr('rx', 15)
          .attr('ry', 15)
          .attr('class', 'choice-highlight');
      });
  }

  /**
   * Calculate circle's radius according to bandwidth
   */
  getCircleRadius() {
    let circleRadius = this.xScale(1) / 2 < this.yScale.bandwidth() / 2 ? this.xScale(1) / 2 : this.yScale.bandwidth() / 2;
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
        .attr('cy', this.yScale(choice.order.toString()) + this.yScale.bandwidth() / 2) // Align to center
        .attr('r', circleRadius);
    });
  }

  /**
   * Create stats columns
   */
  createStats() {
    this.createSumColumn();
    this.createPercentageColumn();
    this.createSeparatingLine();
  }

  createSumColumn() {
    const sumColumn = this.svgElement.append('g').attr('class', 'sum-column');

    if (this.options.stats.showLabel) {
      sumColumn.append('text').attr('class', 'sum-label')
        .attr('x', this.options.chart.width + this.options.stats.sum.marginLeft)
        .attr('y', 0)
        .html('Σ');
    }

    sumColumn.selectAll('.sum-value')
      .data(this.countedAnswers)
      .enter()
      .append('text')
      .attr('class', 'sum-value')
      .attr('x', this.options.chart.width + this.options.stats.sum.marginLeft)
      .attr('y', (choice: any) => this.yScale(choice.order.toString()) + this.yScale.bandwidth() / 2)
      .html((choice: any) => choice.answers.length);
  }

  createPercentageColumn() {
    const percentageColumn = this.svgElement.append('g').attr('class', 'percentage-column');

    const x = this.options.chart.width + this.options.stats.sum.marginLeft + this.options.stats.percentage.marginLeft;
    const labelMargin = 10;
    if (this.options.stats.showLabel) {
      percentageColumn.append('text').attr('class', 'percentage-label')
        .attr('x', x + labelMargin)
        .attr('y', 0)
        .html('%');
    }

    percentageColumn.selectAll('.percentage-value')
      .data(this.countedAnswers)
      .enter()
      .append('text')
      .attr('class', 'percentage-value')
      .attr('x', x)
      .attr('y', (choice: any) => this.yScale(choice.order.toString()) + this.yScale.bandwidth() / 2)
      .html((choice: any) => (choice.answers.length / this.answers.length * 100).toFixed(1).toString());
  }

  createSeparatingLine() {
    const sumColumnX = +this.svgElement.select('.sum-column > .sum-value').attr('x');
    const percentageColumnX = +this.svgElement.select('.percentage-column > .percentage-value').attr('x');
    const x = (sumColumnX + percentageColumnX) / 2 - this.options.stats.percentage.marginLeft / 7;
    const line = this.svgElement.select('.grid-lines').append('line')
      .attr('y2', this.options.height)
      .style('stroke', 'black')
      .attr('transform', `translate(${x}, 0)`);
  }

  /**
   * Create tooltips and add listeners to wanted mouse events
   */
  createTooltips() {
    this.createPlayerTooltip();
    this.createChoiceTooltip();
  }

  createPlayerTooltip() {
    const players = this.svgElement.selectAll('.player');

    players.on('mouseover', (playerName: string, i, nodes) => {
      const node = nodes[i];
      this.createTooltip(node, playerName);
    });

    players.on('mouseout', () => {
      this.hideTooltip();
    });
  }

  createChoiceTooltip() {
    this.disablePointerEventsForIncorrectAnswers(); // Otherwise mouse events would not fire
    const choiceTicks = this.svgElement.selectAll('.y-axis > .tick');
    choiceTicks.on('mouseover', (tickOrder: number, i, nodes) => {
      const choiceData: MCQChoice = this.countedAnswers.find(answer => +answer.order === +tickOrder);
      const choiceTitle = choiceData.text;
      const node: BaseType = this.d3.select(nodes[i]).select('text').node(); // Center tooltip to the <text> element
      this.createTooltip(node, choiceTitle, {
        top: 10,
        left: 0
      });
    });
    choiceTicks.on('mouseout', () => {
      this.hideTooltip();
    });
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
      offset = {
        top: 0,
        left: 0
      }
    };

    const playerBoundingRect: DOMRect = (node as any).getBoundingClientRect();

    let top = playerBoundingRect.top + window.scrollY - offset.top;
    let left = playerBoundingRect.left + window.scrollX - offset.left;

    this.tooltip = this.d3.select('body')
      .append('div')
      .attr('class', 'player-tooltip')
      .style('top', top + 'px')
      .style('left', left + 'px');

    this.tooltip
      .style('opacity', 0)
      .html(content)
      .transition()
      .duration(200)
      .style('opacity', 1);

    const tooltipBoundingRect = (this.tooltip.node() as any).getBoundingClientRect();
    const tooltipCenterOffset = tooltipBoundingRect.width / 2 - playerBoundingRect.width / 2;
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

  /**
   * Add event listeners, notify events service that the event was fired
   */
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

  /**
   * Highlight the player on click
   */
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
