import { OptionDTO } from '../../model/DTO/option-dto';
import { Option } from '../../model/option';
import { ParticipantMapper } from './participant-mapper';

export class OptionMapper {
    static fromDTOs(dtos: OptionDTO[]): Option[] {
        return dtos.map((dto) => OptionMapper.fromDTO(dto));
    }

    static fromDTO(dto: OptionDTO): Option {
        const options = new Option();
        options.text = dto.text;
        options.correct = dto.correct;
        options.participants = ParticipantMapper.fromDTOs(dto.participants);
        return options;
    }
}
