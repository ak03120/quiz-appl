import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Question } from '../types/question';
import { Profile } from '../types/profile';
import { catchError, map } from 'rxjs/operators';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient, private userSvc: UserService) { }
  auth(accessToken: string): Observable<any> {
    return this.http.get<any>('http://localhost:1337/api/auth/google/callback?access_token='+accessToken).pipe(
      map(response => {
        return response;
      })
    );
  }
  createProfile(userId: number): void {
    const jsonData = {
      data: {
        question_progress: '0',
        stage_progress: '0',
        users_permissions_user: {
          id: userId,
        }
      }
    };
    this.http.post<any>('http://localhost:1337/api/profiles', jsonData).subscribe();
  }
  getProfileFromUser(userId: number): Observable<Profile> {
    let apiUrl: string = `http://localhost:1337/api/profiles?populate=*&filters[users_permissions_user][data][attributes][id][$eq]=${userId}`;
    return this.http.get<any>(apiUrl).pipe(
      map(response => {
        const data = response.data[0].attributes;
        const profile: Profile = {
          id: response.data[0].id,
          question_progress: data.question_progress,
          stage_progress: data.stage_progress
        };
        return profile;
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }
  getProfile(profileId: number): Observable<Profile> {
    let apiUrl: string = `http://localhost:1337/api/profiles/${profileId}`;
    //return this.http.get<Question>(apiUrl);
    return this.http.get<any>(apiUrl).pipe(
      map(response => {
        const data = response.data.attributes;
        const profile: Profile = {
          id: response.data.id,
          question_progress: data.question_progress,
          stage_progress: data.stage_progress
        };
        return profile;
      }),
      catchError(error => {
        // エラーログをコンソールに出力
        console.error('Profile API Error:', error);
        // エラーを再度スローして呼び出し元に伝える
        return throwError(error);
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
    return this.http.put<any>(`http://localhost:1337/api/profiles/${this.userSvc.profileId}`, jsonData).pipe(
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
