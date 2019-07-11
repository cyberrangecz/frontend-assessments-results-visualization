import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Kypo2AssessmentsResultsVisualizationModule } from 'projects/kypo2-assessments-results-visualization-lib/src/public_api';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    Kypo2AssessmentsResultsVisualizationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
