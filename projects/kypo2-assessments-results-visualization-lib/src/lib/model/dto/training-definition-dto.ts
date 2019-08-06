import {LevelDTO} from './level-dto';

export class TrainingDefinitionDTO {
  training_definition_id: number;
  training_definition_title: string;
  training_definition_estimated_duration: number;
  levels: LevelDTO[];
}
