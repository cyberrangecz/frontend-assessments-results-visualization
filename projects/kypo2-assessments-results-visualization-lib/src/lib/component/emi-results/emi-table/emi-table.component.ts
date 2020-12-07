import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Answer } from '../../../model/question/answer';
import { EMITableAdapter } from '../../../model/table-adapter/emi-table-adapter';

/**
 * Component displaying table of extended matching items result
 */
@Component({
  selector: 'kypo2-emi-results-table',
  templateUrl: './emi-table.component.html',
  styleUrls: ['./../../shared/emi-mcq-table.component.css'],
})
export class EmiTableComponent implements OnInit {
  @Input() tableData: EMITableAdapter;
  @Input() isTest: boolean;
  @Output() highlighted = new EventEmitter<{ answer: Answer; mouseEvent: MouseEvent }>();

  displayedColumns = ['option', 'sum', 'percentage', 'answers'];
  dataSource;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.tableData.rows);
  }

  /**
   * Calls service to highlight the answer
   * @param $event mouse event
   */
  onHighlight(answer: Answer, $event: MouseEvent): void {
    this.highlighted.emit({ answer, mouseEvent: $event });
  }
}
