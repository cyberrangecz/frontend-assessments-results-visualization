import { TrainingAssessmentEventDTO } from './dto/training-assessment-event-dto';
import { Trainee } from './trainee/trainee';

/**
 * Assessment event recorded in a training run by trainee
 */
export class AssessmentEvent {
  levelId: number;
  answers: string;
  traineeId: number;
  trainee: Trainee;

  constructor(eventDTO: TrainingAssessmentEventDTO) {
    this.levelId = eventDTO.level;
    this.answers = eventDTO.answers;
    this.traineeId = eventDTO.user_ref_id;
  }
}
