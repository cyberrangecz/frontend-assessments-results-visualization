import { Participant } from '../participant';

/**
 * Row in a extend matching items table
 */
export class EMITableRow {
    option: string;
    participants: Participant[];
    isCorrect: boolean;
    answeredCount: number;
    answeredPercentage: number;
}
