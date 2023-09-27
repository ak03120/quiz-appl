import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { Stage } from 'src/app/types/stage';
import { Profile } from 'src/app/types/profile';
import { QuestionService } from 'src/app/services/question.service';
import { Router, ActivatedRoute} from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss']
})
export class StageComponent implements OnInit{
  constructor(private http: HttpClient, private ProfileSvc: ProfileService, private questionSvc: QuestionService, private userSvc: UserService, private router: Router) {}
  stages: Stage[] = [];
  stages_is_disabled: boolean[] = [];
  profile: Profile = {
    id: 0,
    stage_progress: 0,
    question_progress: 0,
  };
  ngOnInit(): void {
    this.ProfileSvc.getProfileFromUser(this.userSvc.userId).subscribe(
      (profile: Profile) => {
        console.log(profile);[[[]]]
        this.profile = profile;
        this.stages = [];
        let stage_count = 0;
        for(let i = 0; i < 10; i++)
        {
          if(profile.stage_progress > 1)
          {
            this.stages.push({id: stage_count, name: `ステージ${stage_count+1}`, correctCount: 10});
            this.stages_is_disabled.push(false);
            profile.stage_progress -= 1;
            profile.question_progress -= 10;
          }
          else if(profile.stage_progress == 1)
          {
            this.stages.push({id: stage_count, name: `ステージ${stage_count+1}`, correctCount: profile.question_progress});
            this.stages_is_disabled.push(false);
            profile.stage_progress -= 1;
          }
          else
          {
            if(i == 0 && profile.stage_progress == 0)
              this.stages_is_disabled.push(false);
            this.stages.push({id: stage_count, name: `ステージ${stage_count+1}`, correctCount: 0});
            this.stages_is_disabled.push(true);
          }
          stage_count++;
        }
      },
      (error) => {
        console.error(error);
      }
    );

  }
  startQuiz(stageNumber: number)
  {
    this.questionSvc.setStage(stageNumber);
    this.router.navigate(["/question", stageNumber]);
  }
}
