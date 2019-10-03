import {TrainingAssessmentEventDTO} from './dto/training-assessment-event-dto';
import {User} from 'kypo2-auth';

export class AssessmentEvent {
  levelId: number;
  answers: string;
  traineeId: number;
  trainee: User;

  constructor(eventDTO: TrainingAssessmentEventDTO) {
    this.levelId = eventDTO.level;
    this.answers = eventDTO.answers;
    this.traineeId = eventDTO.user_ref_id;
  }
}
