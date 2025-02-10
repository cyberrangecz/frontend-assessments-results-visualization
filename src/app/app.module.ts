import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import {
    AssessmentsResultsVisualizationModule
} from '../../projects/assessments-results-visualization/src/public_api';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { VISUALIZATION_CONFIG } from './custom-config';
import { SentinelAuthProviderListComponent } from '@sentinel/auth/components';
import { SentinelAuthGuardWithLogin, SentinelNegativeAuthGuard } from '@sentinel/auth/guards';
import { SentinelAuthModule } from '@sentinel/auth';
import { SentinelLayout1Module, SentinelLayout1SansProvidersModule } from '@sentinel/layout/layout1';

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
        AssessmentsResultsVisualizationModule.forRoot(VISUALIZATION_CONFIG),
        SentinelLayout1Module,
        SentinelAuthModule.forRoot(environment.authConfig),
        RouterModule.forRoot(routes),
        RouterOutlet,
        SentinelLayout1SansProvidersModule
    ],
    providers: [
        SentinelAuthGuardWithLogin,
        SentinelNegativeAuthGuard
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
