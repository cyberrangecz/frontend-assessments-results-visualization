import { Component, OnInit, Input} from '@angular/core';
import { FFQ } from '../../model/question/ffq/ffq';
import { HighlightService } from '../../services/highlight.service';
import {MatTableDataSource} from '@angular/material';
import {Highlightable} from '../shared/highlightable';

/**
 * Component displaying result of a free form question
 */
@Component({
  selector: 'kypo2-ffq-results',
  templateUrl: './ffq-results.component.html',
  styleUrls: ['./ffq-results.component.css']
})
export class FFQResultsComponent extends Highlightable implements OnInit {

  @Input() question: FFQ;

  /**
   * Columns of the table
   */
  displayedColumns = ['name', 'answer'];
  dataSource;
  isTest: boolean;

  constructor(highlightService: HighlightService) {
    super(highlightService);
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.question.answers);
    this.isTest = this.question.correctAnswers.length > 0;
  }

  /**
   * Filters by answer
   * @param filterValue answer to filter by
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
