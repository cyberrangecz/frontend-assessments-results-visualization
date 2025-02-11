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

1. Run `npm install @cyberrangecz-platform/assessment-visualization`
2. Create config class extending **AssessmentConfig** from the library. Config contains following options:
    - restBaseUrl
3. Import **AssessmentsResultsVisualizationModule** from **@cyberrangecz-platform/assessment-visualization** and add it to imports in your module with `AssessmentsResultsVisualizationModule.forRoot(AssessmentConfig)`.
4. Use `<crczp-assessment-results-visualization>` element in your code and provide attributes `trainingDefinitionId`, `trainingInstanceId` and optionally `traineeModeInfo` .

## Running example app

To run the example app, follow these steps:

1. Configure and run the [Training service](https://github.com/cyberrangecz/backend-training) and the [User and group service](https://github.com/cyberrangecz/backend-user-and-group) or the whole [deployment](https://github.com/cyberrangecz/devops-helm).
2. Configure the [environment.local.ts](src/environments/environment.local.ts), pointing to the running services.
3. Run `npm install` to install dependencies.
4. Run `npm run start` to start the application.
5. Open the browser at `https://localhost:4200/`. Changes in the code will be automatically reloaded. The app will be using a self-signed certificate, so you will need to accept it in the browser.
