import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../types/question';
import { Profile } from '../types/profile';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getProfile(num: number): Observable<Profile> {
    let apiUrl: string = `http://localhost:1337/api/profiles/${num}`;
    //return this.http.get<Question>(apiUrl);
    return this.http.get<any>(apiUrl).pipe(
      map(response => {
        const data = response.data.attributes;
        const profile: Profile = {
          id: data.id,
          question_progress: data.question_progress,
          stage_progress: data.stage_progress
        };
        return profile;
      })
    );
  }
  putProgress(question_progress: number): Observable<Profile> {
    const jsonData = {
      data: {
        question_progress: question_progress,
        stage_progress: Math.floor(question_progress / 10 + 1)
      }
    };
    return this.http.put<any>('http://localhost:1337/api/profiles/1', jsonData).pipe(
      map(response => {
        console.log(response);
        const data = response.data.attributes;
        const profile: Profile = {
          id: data.id,
          question_progress: data.question_progress,
          stage_progress: data.stage_progress
        };
        return profile;
      }));
  }
}
