import { QuestionDTO } from '../../model/DTO/question-dto';
import { Question } from '../../model/question';
import { AnswerMapper } from './answer-mapper';
import { EmiAnswerMapper } from './emi-answer-mapper';
import { EmiAnswerDTO } from '../../model/DTO/emi-answer-dto';

export class QuestionMapper {
  static fromDTOs(dtos: QuestionDTO[]): Question[] {
    return dtos.map((dto) => QuestionMapper.fromDTO(dto));
  }

  static fromDTO(dto: QuestionDTO): Question {
    const question = new Question();
    question.id = dto.id;
    question.order = dto.order;
    question.text = dto.text;
    question.questionType = dto.question_type;
    if (dto.question_type === 'EMI') {
      question.answers = EmiAnswerMapper.fromDTOs(dto.answers as EmiAnswerDTO[]);
    } else {
      question.answers = AnswerMapper.fromDTOs(dto.answers);
    }
    return question;
  }
}
