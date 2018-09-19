import { Component } from '@angular/core';
import { MOCK_DATA } from './mocks/results.mock';
import { ExerciseResults } from 'projects/kypo2-assessments-results-visualization-lib/src/lib/models/exercise-results';
import { MCQ } from 'projects/kypo2-assessments-results-visualization-lib/src/lib/models/mcq';
import { MOCK_DATA_BIG } from './mocks/results-big.mock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  MCQData: any = MOCK_DATA.assessments[0].questions[1];
  MCQData_big = MOCK_DATA_BIG.assessments[0].questions[1];
}
