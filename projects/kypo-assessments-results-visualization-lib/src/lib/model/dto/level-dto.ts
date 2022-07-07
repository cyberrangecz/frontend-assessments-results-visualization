export class LevelDTO {
  id: number;
  title: string;
  max_score: number;
  level_type: string;
  estimated_duration: number;
  order: number;

  static isAssessmentLevel(level: LevelDTO): boolean {
    return level.level_type === 'ASSESSMENT_LEVEL';
  }
}
