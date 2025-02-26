import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { AssessmentResultsComponent } from './component/assessment/assessment-results.component';
import { EMIResultsComponent } from './component/emi-results/emi-results.component';
import { EmiTableComponent } from './component/emi-results/emi-table/emi-table.component';
import { FFQResultsComponent } from './component/ffq-results/ffq-results.component';
import { MCQResultsComponent } from './component/mcq-results/mcq-results.component';
import { AssessmentResultsVisualizationComponent } from './assessment-results-visualization.component';
import { AssessmentsResultsVisualizationMaterialModule } from './assessments-results-visualization-material.module';
import { AssessmentVisualizationConfig } from './model/config/asssessment-visualization-config';
import { AssessmentApi } from './services/assessment-api.service';
import { ConfigService } from './services/config.service';

/**
 * Main module of the visualization. To use in your app, import with forRoot() method and pass config object
 */
@NgModule({
    imports: [CommonModule, AssessmentsResultsVisualizationMaterialModule],
    declarations: [
        AssessmentResultsVisualizationComponent,
        FFQResultsComponent,
        MCQResultsComponent,
        EMIResultsComponent,
        AssessmentResultsComponent,
        EmiTableComponent,
    ],
    exports: [AssessmentResultsVisualizationComponent],
    providers: [AssessmentApi, ConfigService],
})
export class AssessmentsResultsVisualizationModule {
    constructor(@Optional() @SkipSelf() parentModule: AssessmentsResultsVisualizationModule) {
        if (parentModule) {
            throw new Error(
                'AssessmentsResultsVisualizationModule is already loaded. Import it in the main module only',
            );
        }
    }

    /**
     * Use this method to import in your app. Pass config object
     * @param assessmentConfig configuration object of the visualization
     */
    static forRoot(
        assessmentConfig: AssessmentVisualizationConfig,
    ): ModuleWithProviders<AssessmentsResultsVisualizationModule> {
        return {
            ngModule: AssessmentsResultsVisualizationModule,
            providers: [{ provide: AssessmentVisualizationConfig, useValue: assessmentConfig }],
        };
    }
}
