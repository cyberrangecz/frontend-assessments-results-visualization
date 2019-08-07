import { Component, OnInit, Input } from '@angular/core';
import {HighlightService} from '../../services/highlight.service';
import {Assessment} from '../../model/assessment';

@Component({
  selector: 'kypo2-viz-assessments-results-visualization',
  templateUrl: './assessment-visualization.component.html',
  styleUrls: ['./assessment-visualization.component.css'],
  providers: [HighlightService]
})
export class AssessmentVisualizationComponent implements OnInit {

  @Input() assessments: Assessment[];

  constructor() { }

  ngOnInit() {
  }

}
