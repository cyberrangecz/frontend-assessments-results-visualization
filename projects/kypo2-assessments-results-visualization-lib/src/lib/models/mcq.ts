import { Question } from "./question";

export class MCQ extends Question {
    choices: MCQChoice[];
    answers: MCQAnswer[];
}
