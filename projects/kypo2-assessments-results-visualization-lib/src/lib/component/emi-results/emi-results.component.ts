import { Component, Input, OnInit } from '@angular/core';
import { Answer } from '../../model/question/answer';
import { EMI } from '../../model/question/emi/emi';
import { EMITableAdapter } from '../../model/table-adapter/emi-table-adapter';
import { HighlightService } from '../../services/highlight.service';
import { HighlightableDirective } from '../../directives/highlightable.directive';

/**
 * Component displaying result of a extended matching items
 */
@Component({
  selector: 'kypo2-emi-results',
  templateUrl: './emi-results.component.html',
  styleUrls: ['./emi-results.component.css'],
})
export class EMIResultsComponent extends HighlightableDirective implements OnInit {
  @Input() question: EMI;
  tableAdapters: EMITableAdapter[] = [];

  constructor(highlightService: HighlightService) {
    super(highlightService);
  }

  ngOnInit(): void {
    this.tableAdapters = this.question.rows.map((row, index) => new EMITableAdapter(this.question, index));
  }

  /**
   * Calls service to highlight the answer
   * @param $event mouse event
   */
  highlighted($event: { answer: Answer; mouseEvent: MouseEvent }): void {
    this.highlight($event.answer, $event.mouseEvent);
  }
}
