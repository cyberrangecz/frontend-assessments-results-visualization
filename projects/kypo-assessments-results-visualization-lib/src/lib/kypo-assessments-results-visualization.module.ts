import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { AssessmentResultsComponent } from './component/assessment/assessment-results.component';
import { EMIResultsComponent } from './component/emi-results/emi-results.component';
import { EmiTableComponent } from './component/emi-results/emi-table/emi-table.component';
import { FFQResultsComponent } from './component/ffq-results/ffq-results.component';
import { MCQResultsComponent } from './component/mcq-results/mcq-results.component';
import { KypoAssessmentResultsVisualizationComponent } from './kypo-assessment-results-visualization.component';
import { KypoAssessmentsResultsVisualizationMaterialModule } from './kypo-assessments-results-visualization-material.module';
import { AssessmentVisualizationConfig } from './model/config/asssessment-visualization-config';
import { AssessmentApi } from './services/assessment-api.service';
import { ConfigService } from './services/config.service';

/**
 * Main module of the visualization. To use in your app, import with forRoot() method and pass config object
 */
@NgModule({
  imports: [CommonModule, KypoAssessmentsResultsVisualizationMaterialModule],
  declarations: [
    KypoAssessmentResultsVisualizationComponent,
    FFQResultsComponent,
    MCQResultsComponent,
    EMIResultsComponent,
    AssessmentResultsComponent,
    EmiTableComponent,
  ],
  exports: [KypoAssessmentResultsVisualizationComponent],
  providers: [AssessmentApi, ConfigService],
})
export class KypoAssessmentsResultsVisualizationModule {
  constructor(@Optional() @SkipSelf() parentModule: KypoAssessmentsResultsVisualizationModule) {
    if (parentModule) {
      throw new Error('KypoAssessmentsResultsVisualizationModule is already loaded. Import it in the main module only');
    }
  }

  /**
   * Use this method to import in your app. Pass config object
   * @param kypoAssessmentConfig configuration object of the visualization
   */
  static forRoot(
    kypoAssessmentConfig: AssessmentVisualizationConfig
  ): ModuleWithProviders<KypoAssessmentsResultsVisualizationModule> {
    return {
      ngModule: KypoAssessmentsResultsVisualizationModule,
      providers: [{ provide: AssessmentVisualizationConfig, useValue: kypoAssessmentConfig }],
    };
  }
}
