import { Component } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { Result } from 'src/app/types/result';
import { Router } from '@angular/router'
import { ResultService } from 'src/app/services/result.service';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/types/profile';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {
  result: Result = {id: 0, stage_number: 0, achievement: "Achievement"};
  correct_count: number = 0;
  constructor(private http: HttpClient ,private profileSvc: ProfileService, private qService: QuestionService, private router: Router, private rService: ResultService) {}
  ngOnInit(): void {
    this.correct_count = this.qService.correctCount;
    this.rService.getResult(this.qService.choiceHistory[0].question_id%10).subscribe(
      (result: Result) => {
        this.result = result;
      },
      (error) => {
        console.error(error);
      }
    )
    console.log(this.qService.choiceHistory[0].question_id);
    this.profileSvc.getProfile(1).subscribe(
      (profile: Profile) => {
        if((this.qService.correctCount + ((this.qService.choiceHistory[0].question_id%10)*10)) > profile.question_progress)
        {
          const jsonData = {
            data: {
              question_progress: this.qService.correctCount + ((this.qService.choiceHistory[0].question_id%10)*10),
              stage_progress: this.qService.choiceHistory[0].question_id%10,
            }
          };
          this.http.put('http://localhost:1337/api/profiles/1', jsonData).subscribe(response => {
            console.log(response);
            this.qService.correctCount = 0;
            this.qService.choiceHistory = [];
          }, error => {
            console.log(error)
          });
        }
      },
      (error) => {
        console.error(error);
      }
    )
  }
}
