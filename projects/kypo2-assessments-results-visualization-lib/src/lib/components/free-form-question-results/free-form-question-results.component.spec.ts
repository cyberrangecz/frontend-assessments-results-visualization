import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeFormQuestionResultsComponent } from './free-form-question-results.component';

describe('FreeFormQuestionResultsComponent', () => {
  let component: FreeFormQuestionResultsComponent;
  let fixture: ComponentFixture<FreeFormQuestionResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreeFormQuestionResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeFormQuestionResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
