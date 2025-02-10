import { EmiAnswerDTO } from '../../model/DTO/emi-answer-dto';
import { EmiAnswers } from '../../model/emi-answers';
import { OptionMapper } from './option-mapper';

export class EmiAnswerMapper {
    static fromDTOs(dtos: EmiAnswerDTO[]): EmiAnswers[] {
        return dtos.map((dto) => EmiAnswerMapper.fromDTO(dto));
    }

    static fromDTO(dto: EmiAnswerDTO): EmiAnswers {
        const answer = new EmiAnswers();
        answer.text = dto.text;
        answer.options = OptionMapper.fromDTOs(dto.options);
        return answer;
    }
}
