import {LevelDTO} from './level-dto';

export class TrainingDefinitionDTO {
  title: string;
  estimated_duration: number;
  levels: LevelDTO[];
}
