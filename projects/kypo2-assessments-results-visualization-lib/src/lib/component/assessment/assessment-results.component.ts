import { Component, OnInit, Input } from '@angular/core';
import {HighlightService} from '../../services/highlight.service';
import {Assessment} from '../../model/assessment';

@Component({
  selector: 'kypo2-assessment-results',
  templateUrl: './assessment-results.component.html',
  styleUrls: ['./assessment-results.component.css'],
  providers: [HighlightService]
})
export class AssessmentResultsComponent implements OnInit {

  @Input() assessments: Assessment[];

  constructor() { }

  ngOnInit() {
  }

}
