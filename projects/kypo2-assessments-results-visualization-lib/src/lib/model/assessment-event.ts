import {Trainee} from './trainee';
import {TrainingAssessmentEventDTO} from './dto/training-assessment-event-dto';

export class AssessmentEvent {
  levelId: number;
  trainee: Trainee;
  answers: string;
  
  constructor(eventDTO: TrainingAssessmentEventDTO) {
    this.trainee = Trainee.fromEvent(eventDTO);
    this.levelId = eventDTO.level;
    this.answers = eventDTO.answers;
  }
}
