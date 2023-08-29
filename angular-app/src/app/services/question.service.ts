import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Choice, Question } from '../types/question';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  choiceHistory: Choice[] = [];
  correctCount: number = 0;

  constructor(private http: HttpClient) { }
  private transformChoiceData(choiceData: any): Choice {
    const choice: Choice = {
      question_id: choiceData.question_id,
      content: choiceData.data.attributes.content,
      order_number: choiceData.data.attributes.order_number
    };
    return choice;
  }

  getQuestion(num: number): Observable<Question> {
    let apiUrl: string = `http://localhost:1337/api/questions/${num}?populate=*`;
    //return this.http.get<Question>(apiUrl);
    return this.http.get<any>(apiUrl).pipe(
      map(response => {
        const questionData = response.data.attributes;
        const question: Question = {
          id: response.data.id,
          stage_number: questionData.stage_number,
          question_text: questionData.question_text,
          question_image_url: questionData.question_image_url,
          answer_type: questionData.answer_type,
          choices: questionData.choices.data.map((choiceData: any) => {
            const choice: Choice = {
              question_id: choiceData.attributes.question_id,
              content: choiceData.attributes.content,
              order_number: choiceData.attributes.order_number
            };
            return choice;
          }),
          answer_correct: questionData.correct_number
        };
        return question;
      })
    );
  }
}
