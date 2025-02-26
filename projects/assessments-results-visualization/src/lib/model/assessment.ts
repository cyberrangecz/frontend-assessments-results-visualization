import { Question } from './question';

export class Assessment {
    id: number;
    title: string;
    order: number;
    assessmentType: string;
    questions: Question[];
}
