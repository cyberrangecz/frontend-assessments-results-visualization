import {Component, Input, OnInit} from '@angular/core';
import {EMI} from '../../model/question/emi/emi';
import {EMITableAdapter} from '../../model/table-adapter/emi-table-adapter';
import {Highlightable} from '../shared/highlightable';
import {HighlightService} from '../../services/highlight.service';
import {Answer} from '../../model/question/answer';

@Component({
  selector: 'kypo2-emi-results',
  templateUrl: './emi-results.component.html',
  styleUrls: ['./emi-results.component.css']
})
export class EMIResultsComponent extends Highlightable implements OnInit {
  @Input() question: EMI;
  tableAdapters: EMITableAdapter[] = [];

  constructor(highlightService: HighlightService) {
    super(highlightService);
  }

  ngOnInit(): void {
    this.tableAdapters = this.question.rows.map((row, index) => new EMITableAdapter(this.question, index));
  }

  onHighlight($event: { answer: Answer; mouseEvent: MouseEvent }) {
    this.highlight($event.answer, $event.mouseEvent);
  }
}
