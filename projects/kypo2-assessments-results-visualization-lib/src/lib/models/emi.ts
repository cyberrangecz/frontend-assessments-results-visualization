import { EMIAnswer } from "./emianswer";
import { EMIChoice } from "./emichoice";
import { Question } from "./question";

export class EMI extends Question {
    choices: EMIChoice[];
    answers: EMIAnswer[];
}
