import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MCQ } from '../../model/question/mcq/mcq';
import { MCQTableAdapter } from '../../model/table-adapter/mcq-table-adapter';
import { HighlightService } from '../../services/highlight.service';
import { HighlightableDirective } from '../../directives/highlightable.directive';

/**
 * Component displaying result of a multiple choice question
 */
@Component({
  selector: 'kypo-mcq-results',
  templateUrl: './mcq-results.component.html',
  styleUrls: ['./../shared/emi-mcq-table.component.css'],
})
export class MCQResultsComponent extends HighlightableDirective implements OnInit {
  @Input() question: MCQ;

  /**
   * Columns of the table
   */
  displayedColumns = ['option', 'sum', 'percentage', 'answers'];
  dataSource;
  isTest: boolean;

  constructor(highlightService: HighlightService) {
    super(highlightService);
  }

  ngOnInit(): void {
    this.isTest = this.question.correctChoices.length > 0;
    this.dataSource = new MatTableDataSource(new MCQTableAdapter(this.question).rows);
  }
}
