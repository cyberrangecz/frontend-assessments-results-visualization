import {Kypo2TraineeModeInfo} from './kypo2-trainee-mode-info';

export class VizualizationInput {
  trainingDefinitionId: number;
  trainingInstanceId: number;
  trainingRunId: number;
  activeTraineeId: number;

  constructor(trainingDefinitionId: number, trainingInstanceId: number, traineeModeInfo: Kypo2TraineeModeInfo = null) {
    this.trainingDefinitionId = trainingDefinitionId;
    this.trainingInstanceId = trainingInstanceId;
    if (traineeModeInfo !== null && !traineeModeInfo !== undefined) {
      this.trainingRunId = traineeModeInfo.trainingRunId;
      this.activeTraineeId = traineeModeInfo.activeTraineeId;
      if (this.isInconsistent()) {
        console.error('INCONSISTENT INPUT: both trainingRunId and activeTraineeId must have value if TraineeMode is active');
      }
    }
  }

  private isInconsistent(): boolean {
    const hasRunId = this.trainingRunId !== undefined && this.trainingRunId !== null;
    const hasTraineeId = this.activeTraineeId !== undefined && this.activeTraineeId !== null;
    return  hasRunId !== hasTraineeId;
  }

  hasNecessaryIds(): boolean {
    return this.trainingDefinitionId !== undefined && this.trainingDefinitionId !== null && this.trainingInstanceId !== undefined && this.trainingInstanceId !== null;
  }
  anonymizeTrainees() {
    return this.trainingRunId !== undefined && this.trainingRunId !== null && this.activeTraineeId !== undefined && this.activeTraineeId !== null;
  }
}
