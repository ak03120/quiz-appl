import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  constructor(private profileSvc: ProfileService, private userSvc: UserService, private route: ActivatedRoute, private router: Router){}
  ngOnInit(): void {
    console.log(this.route.snapshot.queryParams);
    this.profileSvc.auth(this.route.snapshot.queryParams['access_token']).subscribe(
      (strapiUser: any) => {
        console.log(strapiUser);
        this.profileSvc.createProfile(strapiUser.user.id);
        localStorage.setItem("jwt", strapiUser.jwt);
        localStorage.setItem("user_id", strapiUser.user.id);
        this.userSvc.jwt = strapiUser.jwt;
        this.userSvc.userId = strapiUser.user.id;
        let isRegistered: boolean = false;
        this.profileSvc.getProfileFromUser(this.userSvc.userId).subscribe(
        res => {
          isRegistered = true;
        },
        error => {
          if(!isRegistered)
          {
            this.profileSvc.createProfile(this.userSvc.userId);
            console.log('Created profile');
          }
        }
        )
        this.router.navigate(["/start"]);
      }
    );
  }
}
