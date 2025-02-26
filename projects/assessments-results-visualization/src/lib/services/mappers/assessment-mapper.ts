import { AssessmentDTO } from '../../model/DTO/assessment-dto';
import { Assessment } from '../../model/assessment';
import { QuestionMapper } from './question-mapper';

export class AssessmentMapper {
    static fromDTOs(dtos: AssessmentDTO[]): Assessment[] {
        return dtos.map((dto) => AssessmentMapper.fromDTO(dto));
    }

    static fromDTO(dto: AssessmentDTO): Assessment {
        const assessment = new Assessment();
        assessment.id = dto.id;
        assessment.order = dto.order;
        assessment.title = dto.title;
        assessment.assessmentType = dto.assessment_type;
        assessment.questions = QuestionMapper.fromDTOs(dto.questions);
        return assessment;
    }
}
