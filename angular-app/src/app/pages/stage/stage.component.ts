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
  stages: Stage[] = [
    {id: 0, name: "ステージ1", correctCount: 10},
    {id: 1, name: "ステージ2", correctCount: 7},
    {id: 2, name: "ステージ3", correctCount: 0},
    {id: 3, name: "ステージ4", correctCount: 0},
    {id: 4, name: "ステージ5", correctCount: 0},
    {id: 5, name: "ステージ6", correctCount: 0},

  ];
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
        let stage_count = 0;
        for(let i = profile.question_progress; i > 0; i -= 10)
        {
          if(profile.question_progress >= 10)
          {
            this.stages.push({id: stage_count, name: `ステージ${stage_count+1}`, correctCount: 10});
            profile.question_progress -= 10;
          }
          else
          {
            this.stages.push({id: stage_count, name: `ステージ${stage_count+1}`, correctCount: profile.question_progress});
          }
          

        }
      },
      (error) => {
        console.error(error);
      }
    );

  }
}
