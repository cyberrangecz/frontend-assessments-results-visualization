import { Component, OnInit, Input } from '@angular/core';
import { ExerciseResults } from '../../models/exercise-results';
import { FFQ } from '../../models/ffq';
import { Assessment } from '../../models/assessment';
import { Question } from '../../models/question';

@Component({
  selector: 'kypo2-viz-assessments-results-visualizations',
  templateUrl: './visualizations.component.html',
  styleUrls: ['./visualizations.component.css']
})
export class VisualizationsComponent implements OnInit {

  @Input() data: ExerciseResults;

  constructor() { }

  ngOnInit() {

  }

}
