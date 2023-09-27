import { Component } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { Result } from 'src/app/types/result';
import { Router } from '@angular/router'
import { ResultService } from 'src/app/services/result.service';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/types/profile';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {
  result: Result = {id: 0, stage_number: 0, achievement: "Achievement"};
  correct_count: number = 0;
  constructor(private http: HttpClient ,private profileSvc: ProfileService, private qService: QuestionService, private router: Router, private rService: ResultService, private userSvc: UserService) {}
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
    let correctedCount: number = ((this.qService.choiceHistory[0].question_id%10)*10);
    this.profileSvc.getProfileFromUser(this.userSvc.userId).subscribe(
      (profile: Profile) => {
        let isCleared: boolean = this.qService.currentStage < profile.stage_progress;
        if(isCleared) {
          console.log("Already cleared");
          return;
        }
        if(this.qService.correctCount > profile.question_progress%10)
        {
          let clearedQuestions = (this.qService.currentStage-1)*10;
          console.log("if true");
          console.log(this.qService.correctCount + clearedQuestions);
          console.log(((this.qService.choiceHistory[0].question_id%10)*10));
          this.profileSvc.putProgress(this.qService.correctCount + clearedQuestions).subscribe((profile: Profile) => {

          });
        }
      },
      (error) => {
        console.error(error);
      },
      () => {
        console.log("Complete");
        console.log(this.qService.choiceHistory);
        this.qService.correctCount = 0;
        this.qService.choiceHistory = [];
      }
    )
  }
}
