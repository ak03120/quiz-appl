import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { Stage } from 'src/app/types/stage';
import { Profile } from 'src/app/types/profile';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss']
})
export class StageComponent implements OnInit{
  constructor(private http: HttpClient, private ProfileSvc: ProfileService) {}
  stages: Stage[] = [];
  stages_is_disabled: boolean[] = [];
  profile: Profile = {
    id: 0,
    stage_progress: 0,
    question_progress: 0,
  };
  ngOnInit(): void {
    const profileId: number = 1;
    this.ProfileSvc.getProfile(profileId).subscribe(
      (profile: Profile) => {
        console.log(profile);[[[]]]
        this.profile = profile;
        this.stages = [];
        let stage_count = 0;
        for(let i = 0; i < 10; i++)
        {
          if(profile.question_progress >= 10)
          {
            this.stages.push({id: stage_count, name: `ステージ${stage_count+1}`, correctCount: 10});
            this.stages_is_disabled.push(false);
            if(profile.question_progress == 10)
              this.stages_is_disabled.push(false);
            profile.question_progress -= 10;
          }
          else if(profile.question_progress > 0)
          {
            this.stages.push({id: stage_count, name: `ステージ${stage_count+1}`, correctCount: profile.question_progress});
            this.stages_is_disabled.push(false);
            profile.question_progress -= 10;
          }
          else
          {
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
}
