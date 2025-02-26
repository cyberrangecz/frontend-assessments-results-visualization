import { ParticipantDTO } from './participant-dto';

export class AnswerDTO {
    text: string;
    participants: ParticipantDTO[];
    correct: boolean;
}
