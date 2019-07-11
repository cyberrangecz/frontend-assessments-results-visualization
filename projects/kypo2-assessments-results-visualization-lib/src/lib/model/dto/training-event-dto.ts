export class TrainingEventDTO {
  type: string;
  full_name_without_titles: string;
  full_name: string;
  player_login: string;
  timestamp: string;
  level: number;

  static isAssessmentAnsweredEvent(event: TrainingEventDTO ): boolean {
    return event.type.endsWith('AssessmentAnswers');
  }
}

