import { Question } from "./question";
import { FFQAnswer } from "./ffqanswer";

export class FFQ extends Question {
    correctChoices: string[];
    answers: FFQAnswer[];
}
