import { AnswerDTO } from '../../model/DTO/answer-dto';
import { Answer } from '../../model/answer';
import { ParticipantMapper } from './participant-mapper';

export class AnswerMapper {
    static fromDTOs(dtos: AnswerDTO[]): Answer[] {
        return dtos.map((dto) => AnswerMapper.fromDTO(dto));
    }

    static fromDTO(dto: AnswerDTO): Answer {
        const answer = new Answer();
        answer.text = dto.text;
        answer.correct = dto.correct;
        answer.participants = ParticipantMapper.fromDTOs(dto.participants);
        return answer;
    }
}
