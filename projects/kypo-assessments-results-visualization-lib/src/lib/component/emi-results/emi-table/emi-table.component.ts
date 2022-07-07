import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Answer } from '../../../model/question/answer';
import { EMITableAdapter } from '../../../model/table-adapter/emi-table-adapter';

/**
 * Component displaying table of extended matching items result
 */
@Component({
  selector: 'kypo-emi-results-table',
  templateUrl: './emi-table.component.html',
  styleUrls: ['./../../shared/emi-mcq-table.component.css'],
})
/* eslint-disable @angular-eslint/no-output-on-prefix */
export class EmiTableComponent implements OnInit {
  @Input() tableData: EMITableAdapter;
  @Input() isTest: boolean;
  @Output() highlighted: EventEmitter<any> = new EventEmitter();

  displayedColumns = ['option', 'sum', 'percentage', 'answers'];
  dataSource;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.tableData.rows);
  }

  /**
   * Calls service to highlight the answer
   * @param answer
   * @param $event mouse event
   */
  onHighlight(answer: Answer, $event: MouseEvent): void {
    this.highlighted.emit({ answer: Answer, mouseEvent: $event });
  }
}
