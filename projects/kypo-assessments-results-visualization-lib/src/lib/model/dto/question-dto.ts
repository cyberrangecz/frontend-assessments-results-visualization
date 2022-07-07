import { QuestionChoiceDTO } from './question-choice-dto';
import { ExtendedMatchingOptionDTO } from './extended-matching-option-dto';
import { ExtendedMatchingStatementDTO } from './extended-matching-statement-dto';

export class QuestionDTO {
  id: number;
  question_type: string;
  text: string;
  points: number;
  penalty: number;
  order: number;
  answer_required: boolean;
  choices: QuestionChoiceDTO[];
  extended_matching_options: ExtendedMatchingOptionDTO[];
  extended_matching_statements: ExtendedMatchingStatementDTO[];
}
