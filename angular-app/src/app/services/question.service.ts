import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../types/question';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  

  constructor(private http: HttpClient) { }

  getQuestion(num: number): Observable<Question> {
    let apiUrl: string = `http://localhost:1337/api/questions/${num}?populate=*`;
    //return this.http.get<Question>(apiUrl);
    return this.http.get<{ data: { attributes: Question } }>(apiUrl).pipe(
      map(response => response.data.attributes)
    );
  }
}
