import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendedMatchingResultsComponent } from './extended-matching-results.component';

describe('ExtendedMatchingResultsComponent', () => {
  let component: ExtendedMatchingResultsComponent;
  let fixture: ComponentFixture<ExtendedMatchingResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendedMatchingResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedMatchingResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
