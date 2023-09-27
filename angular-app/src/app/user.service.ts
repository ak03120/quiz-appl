import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userId: any;
  jwt: any;
  profileId: any;
  base: string = 'http://localhost:1337/api'
  constructor(private http: HttpClient) { }
  getMe(): Observable<any> {
    return this.http.get(this.base+'/users/me', {headers: {Authorization: `Bearer ${this.jwt}`}});
  }
}
