import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { AssessmentResultsComponent } from './component/assessment/assessment-results.component';
import { EMIResultsComponent } from './component/emi-results/emi-results.component';
import { EmiTableComponent } from './component/emi-results/emi-table/emi-table.component';
import { FFQResultsComponent } from './component/ffq-results/ffq-results.component';
import { MCQResultsComponent } from './component/mcq-results/mcq-results.component';
import { Kypo2AssessmentResultsVisualizationComponent } from './kypo2-assessment-results-visualization.component';
import { Kypo2AssessmentsResultsVisualizationMaterialModule } from './kypo2-assessments-results-visualization-material.module';
import { AssessmentVisualizationConfig } from './model/config/asssessment-visualization-config';
import { AssessmentApi } from './services/assessment-api.service';
import { ConfigService } from './services/config.service';

/**
 * Main module of the visualization. To use in your app, import with forRoot() method and pass config object
 */
@NgModule({
  imports: [CommonModule, Kypo2AssessmentsResultsVisualizationMaterialModule],
  declarations: [
    Kypo2AssessmentResultsVisualizationComponent,
    FFQResultsComponent,
    MCQResultsComponent,
    EMIResultsComponent,
    AssessmentResultsComponent,
    EmiTableComponent,
  ],
  exports: [Kypo2AssessmentResultsVisualizationComponent],
  providers: [AssessmentApi, ConfigService],
})
export class Kypo2AssessmentsResultsVisualizationModule {
  constructor(@Optional() @SkipSelf() parentModule: Kypo2AssessmentsResultsVisualizationModule) {
    if (parentModule) {
      throw new Error(
        'Kypo2AssessmentsResultsVisualizationModule is already loaded. Import it in the main module only'
      );
    }
  }

  /**
   * Use this method to import in your app. Pass config object
   * @param kypo2AssessmentConfig configuration object of the visualization
   */
  static forRoot(
    kypo2AssessmentConfig: AssessmentVisualizationConfig
  ): ModuleWithProviders<Kypo2AssessmentsResultsVisualizationModule> {
    return {
      ngModule: Kypo2AssessmentsResultsVisualizationModule,
      providers: [{ provide: AssessmentVisualizationConfig, useValue: kypo2AssessmentConfig }],
    };
  }
}
