import { Question } from "./question";

export class FFQ extends Question {
    correctChoices: string[];
    answers: FFQAnswer[];
}
