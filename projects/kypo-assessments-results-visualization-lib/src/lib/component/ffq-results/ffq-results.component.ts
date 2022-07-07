import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FFQ } from '../../model/question/ffq/ffq';
import { HighlightService } from '../../services/highlight.service';
import { HighlightableDirective } from '../../directives/highlightable.directive';

/**
 * Component displaying result of a free form question
 */
@Component({
  selector: 'kypo-ffq-results',
  templateUrl: './ffq-results.component.html',
  styleUrls: ['./ffq-results.component.css'],
})
export class FFQResultsComponent extends HighlightableDirective implements OnInit {
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

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.question.answers);
    this.isTest = this.question.correctAnswers.length > 0;
  }

  /**
   * Filters by answer
   * @param filterValue answer to filter by
   */
  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
