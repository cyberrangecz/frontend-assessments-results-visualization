import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleChoiceQuestionChartComponent } from './multiple-choice-question-chart.component';

describe('MultipleChoiceQuestionChartComponent', () => {
  let component: MultipleChoiceQuestionChartComponent;
  let fixture: ComponentFixture<MultipleChoiceQuestionChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleChoiceQuestionChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleChoiceQuestionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
