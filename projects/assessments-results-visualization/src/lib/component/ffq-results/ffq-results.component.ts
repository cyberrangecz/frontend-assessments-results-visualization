import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HighlightService } from '../../services/highlight.service';
import { HighlightableDirective } from '../../directives/highlightable.directive';
import { Question } from '../../model/question';
import { FFQTableAdapter } from '../../model/table-adapter/ffq-table-adapter';

/**
 * Component displaying result of a free form question
 */
@Component({
  selector: 'crczp-ffq-results',
  templateUrl: './ffq-results.component.html',
  styleUrls: ['./ffq-results.component.css'],
})
export class FFQResultsComponent extends HighlightableDirective implements OnInit {
  @Input() question: Question;
  @Input() isTest: boolean;

  /**
   * Columns of the table
   */
  displayedColumns = ['name', 'answer'];
  dataSource;

  constructor(highlightService: HighlightService) {
    super(highlightService);
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(new FFQTableAdapter(this.question).rows);
  }

  /**
   * Filters by answer
   * @param filterValue answer to filter by
   */
  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
