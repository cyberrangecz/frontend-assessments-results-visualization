import { TestBed, inject } from '@angular/core/testing';

import { Kypo2AssessmentsResultsVisualizationLibService } from './kypo2-assessments-results-visualization-lib.service';

describe('Kypo2AssessmentsResultsVisualizationLibService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Kypo2AssessmentsResultsVisualizationLibService]
    });
  });

  it('should be created', inject([Kypo2AssessmentsResultsVisualizationLibService], (service: Kypo2AssessmentsResultsVisualizationLibService) => {
    expect(service).toBeTruthy();
  }));
});
