import { MCQChoice } from "../../../models/mcqchoice";

export interface CountedAnswer extends MCQChoice {
    answers: string[];
}