import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { KypoAssessmentsResultsVisualizationModule } from 'projects/kypo-assessments-results-visualization-lib/src/public_api';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { VISUALIZATION_CONFIG } from './custom-config';
import { SentinelAuthProviderListComponent } from '@sentinel/auth/components';
import { SentinelAuthGuardWithLogin, SentinelNegativeAuthGuard } from '@sentinel/auth/guards';
import { SentinelAuthModule } from '@sentinel/auth';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: SentinelAuthProviderListComponent,
    canActivate: [SentinelNegativeAuthGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [SentinelAuthGuardWithLogin],
  },
];

/**
 * Main app module of example app
 */
@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    KypoAssessmentsResultsVisualizationModule.forRoot(VISUALIZATION_CONFIG),
    SentinelAuthModule.forRoot(environment.authConfig),
    RouterModule.forRoot(routes),
  ],
  providers: [
    SentinelAuthGuardWithLogin,
    SentinelNegativeAuthGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
