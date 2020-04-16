import { Component, Input, OnInit } from '@angular/core';
import { Assessment } from '../../model/assessment';
import { HighlightService } from '../../services/highlight.service';

/**
 * Component displaying result of one assessment. Contains components of assessment questions
 */
@Component({
  selector: 'kypo2-assessment-results',
  templateUrl: './assessment-results.component.html',
  styleUrls: ['./assessment-results.component.css'],
  providers: [HighlightService],
})
export class AssessmentResultsComponent implements OnInit {
  @Input() assessments: Assessment[];

  constructor() {}

  ngOnInit() {}
}
