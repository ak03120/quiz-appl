import { Injectable } from '@angular/core';
import { Result } from '../types/result';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private http: HttpClient) { }
  getResult(num: number): Observable<Result> {
    let apiUrl: string = `http://localhost:1337/api/stages/${num}?populate=*`;
    return this.http.get<any>(apiUrl).pipe(
      map(response => {
        const attributes = response.data.attributes;
        const val: Result = {
          id: attributes.id,
          stage_number: attributes.stage_number,
          achievement: attributes.achievement,
        };
        return val;
      })
    );
  }
}
