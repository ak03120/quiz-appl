import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { ResultService } from 'src/app/services/result.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  name: string = '';
  correctCount: number = 0;
  achievements: string[] = [];
  constructor(private userSvc: UserService, private profileSvc: ProfileService, private resultSvc: ResultService) {}
  ngOnInit(): void {
    this.userSvc.getMe().subscribe(res => {
      this.name = res.username;
      this.profileSvc.getProfileFromUser(this.userSvc.userId).subscribe(res => {
        console.log(res);
        this.correctCount = res.question_progress;
        for(let i = 1; i <= res.stage_progress; i++)
        {
          this.resultSvc.getResult(i).subscribe(res => {
            this.achievements.push(res.achievement);
          })
        }
      })
    })
  }
}
