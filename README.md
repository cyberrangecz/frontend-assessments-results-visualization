# Visualizations of the results from assessments

Material-style visualization component for the Assessment level results. It shows combined
results results for individual questions while enabilng to highlight answers of single
participant.
Correct answer is in different color.

The visualization is integrated with [KYPO2 Trainings microservice](https://gitlab.ics.muni.cz/kypo2/services-and-portlets/kypo2-training) and its events.

Features:

- click to select related results of a single participant
- correct answers highlighted
- tooltips with the name of the participant for each bullet
- organizator point of view displaying results of all participants
- trainee point of view displaying result of one trainee and anonymized results of other participants

## Prerequisites

To use the library you need to have installed:

- NPM with private [KYPO Nexus repository](https://projects.ics.muni.cz/projects/kbase/knowledgebase/articles/153)
- Angular Material v8 or higher

## Usage

To use the library in your Angular application follow these steps:

1. Run `npm install kypo2-assessments-results-visualization`
2. Create config class extending **Kypo2AssessmentConfig** from the library. Config contains following options:
   - restBaseUrl
3. Import **Kypo2AssessmentsResultsVisualizationModule** from **kypo2-assessments-results-visualization** and add it to imports in your module with `Kypo2AssessmentsResultsVisualizationModule.forRoot(Kypo2AssessmentConfig)`.
4. Use `<kypo2-assessment-results-viz>` element in your code and provide attributes `trainingDefinitionId`, `trainingInstanceId` and optionally `traineeModeInfo` .
