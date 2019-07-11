import {TrainingEventDTO} from './dto/training-event-dto';

export class Trainee {
  name: string;
  nameWithAcademicTitles: string;
  login: string;

  static fromEvent(eventDTO: TrainingEventDTO): Trainee {
    const trainee = new Trainee();
    trainee.name = eventDTO.full_name_without_titles;
    trainee.nameWithAcademicTitles = eventDTO.full_name;
    trainee.login = eventDTO.player_login;
    return  trainee;
  }

  getLoginWithoutSpecialChars(): string {
    return this.login.replace('@', '-').replace('.', '-');
  }

  equals(other: Trainee): boolean {
    if (other === undefined || other === null) {
      return false;
    }
    return this.login === other.login;
  }
}
