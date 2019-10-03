export class TrainingEventDTO {
  type: string;
  user_ref_id: number;
  level: number;

  static isAssessmentAnsweredEvent(event: TrainingEventDTO ): boolean {
    return event.type.endsWith('AssessmentAnswers');
  }
}

