import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { Stage } from 'src/app/types/stage';
import { Profile } from 'src/app/types/profile';
import { QuestionService } from 'src/app/services/question.service';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss']
})
export class StageComponent implements OnInit{
  constructor(private http: HttpClient, private ProfileSvc: ProfileService, private questionSvc: QuestionService, private router: Router) {}
  stages: Stage[] = [];
  disabledStages: boolean[] = [];
  profile: Profile = {
    id: 0,
    stage_progress: 0,
    question_progress: 0,
  };
  ngOnInit(): void {
    const profileId: number = 1;
    this.ProfileSvc.getProfile(profileId).subscribe(
      (profile: Profile) => {
        console.log(profile);
        this.profile = profile;
        this.stages = [];
        for(let stageCount = 0; stageCount < 11; stageCount++)
        {
          if(profile.stage_progress > 1)
          {
            this.stages.push({id: stageCount, name: `ステージ${stageCount+1}`, correctCount: 10});
            this.disabledStages.push(false);
            profile.stage_progress -= 1;
            profile.question_progress -= 10;
          }
          else if(profile.stage_progress == 1)
          {
            this.stages.push({id: stageCount, name: `ステージ${stageCount+1}`, correctCount: profile.question_progress});
            this.disabledStages.push(false);
            profile.stage_progress -= 1;
          }
          else
          {
            if(stageCount == 0 && profile.stage_progress == 0)
              this.disabledStages.push(false);
            this.stages.push({id: stageCount, name: `ステージ${stageCount+1}`, correctCount: 0});
            this.disabledStages.push(true);
          }
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
