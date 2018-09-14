import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Kypo2AssessmentsResultsVisualizationLibModule } from 'projects/kypo2-assessments-results-visualization-lib/src/public_api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    Kypo2AssessmentsResultsVisualizationLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
