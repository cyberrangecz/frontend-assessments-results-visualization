import { Component, Input } from '@angular/core';
import { HighlightService } from '../../services/highlight.service';
import { Assessment } from '../../model/assessment';

/**
 * Component displaying result of one assessment. Contains components of assessment questions
 */
@Component({
  selector: 'crczp-assessment-results',
  templateUrl: './assessment-results.component.html',
  styleUrls: ['./assessment-results.component.css'],
  providers: [HighlightService],
})
export class AssessmentResultsComponent {
  @Input() assessments: Assessment[];
}
