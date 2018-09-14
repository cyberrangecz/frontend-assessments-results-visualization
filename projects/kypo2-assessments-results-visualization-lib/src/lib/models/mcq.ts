import { Question } from "./question";
import { MCQAnswer } from "./mcqanswer";
import { MCQChoice } from "./mcqchoice";

export class MCQ extends Question {
    choices: MCQChoice[];
    answers: MCQAnswer[];
}
