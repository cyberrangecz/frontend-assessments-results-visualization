import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {EMITableAdapter} from '../../../model/table-adapter/emi-table-adapter';
import {Answer} from '../../../model/question/answer';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'kypo2-viz-assessments-results-emi-table',
  templateUrl: './emi-table.component.html',
  styleUrls: ['./../../shared/emi-mcq-table.component.css']
})
export class EmiTableComponent implements OnInit {

  @Input() tableData: EMITableAdapter;
  @Input() isTest: boolean;
  @Output() highlighted = new EventEmitter<{answer: Answer, mouseEvent: MouseEvent}>();

  displayedColumns = ['option', 'answers', 'sum', 'percentage'];
  dataSource;

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.tableData.rows);
  }

  onHighlight(answer: Answer, $event: MouseEvent) {
    this.highlighted.emit({answer: answer, mouseEvent: $event});
  }
}
