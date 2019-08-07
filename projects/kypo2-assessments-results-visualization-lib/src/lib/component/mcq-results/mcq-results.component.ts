import { Component, Input, OnInit} from '@angular/core';
import {MCQ} from '../../model/question/mcq/mcq';
import {MatTableDataSource} from '@angular/material';
import {MCQTableAdapter} from '../../model/table-adapter/mcq-table-adapter';
import {HighlightService} from '../../services/highlight.service';
import {Highlightable} from '../shared/highlightable';

@Component({
  selector: 'kypo2-mcq-results',
  templateUrl: './mcq-results.component.html',
  styleUrls: ['./../shared/emi-mcq-table.component.css']
})
export class MCQResultsComponent extends Highlightable implements OnInit {

  @Input() question: MCQ;

  displayedColumns = ['option', 'answers', 'sum', 'percentage'];
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

