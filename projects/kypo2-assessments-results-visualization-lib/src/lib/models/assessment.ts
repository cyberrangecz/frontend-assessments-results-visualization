import { Question } from "./question";

export class Assessment {
    title : string;
    instructions : string;
    type : string;
    position : number;
    order : number;
    questions: Question[];
}
