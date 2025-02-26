import { ParticipantDTO } from './participant-dto';

export class OptionDTO {
    text: string;
    participants: ParticipantDTO[];
    correct: boolean;
}
