import { ParticipantDTO } from '../../model/DTO/participant-dto';
import { Participant } from '../../model/participant';

export class ParticipantMapper {
  static fromDTOs(dtos: ParticipantDTO[]): Participant[] {
    return dtos.map((dto) => ParticipantMapper.fromDTO(dto));
  }

  static fromDTO(dto: ParticipantDTO): Participant {
    const participant = new Participant();
    participant.userRefId = dto.user_ref_id;
    participant.iss = dto.iss;
    participant.sub = dto.sub;
    participant.mail = dto.mail;
    participant.fullName = dto.full_name.replace(/"/gi, '');
    participant.familyName = dto.family_name;
    participant.givenName = dto.given_name;
    participant.picture = dto.picture;
    return participant;
  }
}
