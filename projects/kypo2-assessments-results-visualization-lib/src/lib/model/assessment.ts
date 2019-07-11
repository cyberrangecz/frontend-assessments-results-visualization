import {Question} from './question/question';
import {AssessmentEvent} from './assessment-event';
import {AssessmentLevelDTO} from './dto/assessment-level-dto';
import {MCQ} from './question/mcq/mcq';
import {EMI} from './question/emi/emi';
import {FFQ} from './question/ffq/ffq';
import {Trainee} from './trainee';
import {Answer} from './question/answer';
import {FFQAnswer} from './question/ffq/ffq-answer';
import {MCQAnswer} from './question/mcq/mcq-answer';
import {EMIAnswer} from './question/emi/emi-answer';

export class Assessment {
  id: number;
  title: string;
  estimatedDuration: number;
  order: number;
  maxScore: number;
  questions: Question[];
  isTest: boolean;


  constructor(levelDTO: AssessmentLevelDTO) {
    this.id = levelDTO.id;
    this.estimatedDuration = levelDTO.estimated_duration;
    this.isTest = AssessmentLevelDTO.isTest(levelDTO);
    this.maxScore = levelDTO.max_score;
    this.order = levelDTO.order;
    this.title = levelDTO.title;
    this.questions = this.questionsJSONToQuestions(JSON.parse(levelDTO.questions), this.isTest)
      .sort((a, b) => a.order - b.order);
  }

  fillAnswers(assessmentEvent: AssessmentEvent) {
    const answersJSON = JSON.parse(assessmentEvent.answers);
    this.questions.forEach(question => {
      answersJSON
        .filter(answerJSON => answerJSON.question_order === question.order)
        .forEach(matchedAnswerJSON => {
          const answer = this.answerJSONToAnswer(matchedAnswerJSON, question, assessmentEvent.trainee);
          if (answer.wasAnswered()) {
            question.answers.push(answer);
          }
        });
      if (this.isTest) {
        question.evaluateAnswers();
      }
    });
  }

  private answerJSONToAnswer(answerJSON, question: Question, trainee: Trainee): Answer {
    if (question instanceof FFQ) {
      return new FFQAnswer(answerJSON, trainee);
    }
    if (question instanceof MCQ) {
      return new MCQAnswer(answerJSON, trainee);
    }
    if (question instanceof EMI) {
      return new EMIAnswer(answerJSON, trainee);
    }
    console.error('Unknown question type');
    return null;
  }

  private questionsJSONToQuestions(questionsJSON, isTest: boolean): Question[] {
    return questionsJSON.map(questionJSON => this.questionJSONToQuestion(questionJSON, isTest));
  }

  private questionJSONToQuestion(questionJSON, isTest: boolean): Question {
    switch (questionJSON.question_type) {
      case 'FFQ': return new FFQ(questionJSON, isTest);
      case 'EMI': return new EMI(questionJSON, isTest);
      case 'MCQ': return new MCQ(questionJSON, isTest);
      default: console.error('Could not map question from JSON to any of known types');
    }
  }


}
