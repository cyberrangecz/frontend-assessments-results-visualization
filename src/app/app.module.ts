import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Kypo2AssessmentsResultsVisualizationModule } from 'projects/kypo2-assessments-results-visualization-lib/src/public_api';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {
  Kypo2AuthGuardWithLogin,
  Kypo2AuthInterceptor,
  Kypo2AuthModule,
  Kypo2AuthProviderPickerComponent,
  Kypo2NotAuthGuardService
} from 'kypo2-auth';
import { HomeComponent } from './home/home.component';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Kypo2AuthProviderPickerComponent,
    canActivate: [Kypo2NotAuthGuardService]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [Kypo2AuthGuardWithLogin]
  },

];

/**
 * Main app module of example app
 */
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    Kypo2AssessmentsResultsVisualizationModule.forRoot({ restBaseUrl: environment.restBaseUrl}),
    Kypo2AuthModule.forRoot(environment.kypo2AuthConfig),
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Kypo2AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
