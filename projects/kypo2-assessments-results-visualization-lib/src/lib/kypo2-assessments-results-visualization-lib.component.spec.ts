import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Kypo2AssessmentsResultsVisualizationLibComponent } from './kypo2-assessments-results-visualization-lib.component';

describe('Kypo2AssessmentsResultsVisualizationLibComponent', () => {
  let component: Kypo2AssessmentsResultsVisualizationLibComponent;
  let fixture: ComponentFixture<Kypo2AssessmentsResultsVisualizationLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Kypo2AssessmentsResultsVisualizationLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Kypo2AssessmentsResultsVisualizationLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
