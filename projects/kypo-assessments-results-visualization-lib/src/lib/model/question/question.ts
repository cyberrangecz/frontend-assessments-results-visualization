import { Answer } from './answer';
import { QuestionDTO } from '../dto/question-dto';

/**
 * Abstract class representing a question in assessment
 */
export abstract class Question {
  id: number;
  title: string;
  order: number;
  score: number;
  penalty: number;
  type: string;
  answers: Answer[] = [];

  protected constructor(questionDTO: QuestionDTO) {
    this.id = questionDTO.id;
    this.title = questionDTO.text;
    this.penalty = questionDTO.penalty;
    this.score = questionDTO.points;
    this.order = questionDTO.order;
  }

  /**
   * Evaluates if answer was answered correctly or not and stores the result in answer object
   */
  abstract evaluateAnswers(): void;
}
