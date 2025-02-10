# CyberRangeᶜᶻ Platform Visualizations of the results from assessments

Material-style visualization component for the Assessment level results. It shows combined
results for individual questions while enabilng to highlight answers of single
participant. Correct answer is in different color.

The visualization is integrated with [Training service](https://github.com/cyberrangecz/backend-training) and its events.

Features:

- click to select related results of a single participant
- correct answers highlighted
- tooltips with the name of the participant for each bullet
- organizator point of view displaying results of all participants
- trainee point of view displaying result of one trainee and anonymized results of other participants

## Usage

To use the library in your Angular application follow these steps:

1. Run `npm install @crczp/assessment-visualization`
2. Create config class extending **AssessmentConfig** from the library. Config contains following options:
    - restBaseUrl
3. Import **AssessmentsResultsVisualizationModule** from **@crczp/assessment-visualization** and add it to imports in your module with `AssessmentsResultsVisualizationModule.forRoot(AssessmentConfig)`.
4. Use `<crczp-assessment-results-visualization>` element in your code and provide attributes `trainingDefinitionId`, `trainingInstanceId` and optionally `traineeModeInfo` .
