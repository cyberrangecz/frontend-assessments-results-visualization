import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentVisualizationComponent } from './assessment-visualization.component';

describe('VisualizationsComponent', () => {
  let component: AssessmentVisualizationComponent;
  let fixture: ComponentFixture<AssessmentVisualizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentVisualizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
