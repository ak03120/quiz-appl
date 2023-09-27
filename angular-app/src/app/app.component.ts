import { Component } from '@angular/core';
import { SocialAuthService, SocialUser, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { UserService } from './user.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from './services/profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'quiz-appl';
  constructor(private userSvc: UserService, private profileSvc: ProfileService, private router: Router, private authService: SocialAuthService) {}

  ngOnInit(): void {
    if(localStorage.getItem('jwt') || location.pathname === '/auth')
    {
      this.userSvc.jwt = localStorage.getItem('jwt');
      this.userSvc.getMe().subscribe(res => {
        localStorage.setItem('user_id', res.id);
        this.userSvc.userId = res.id;
        console.log("Authenticated: ", res);
        this.profileSvc.getProfileFromUser(res.id).subscribe(res => {
          console.log(res);
          this.userSvc.profileId = res.id;
        })
      });
    }
    else
    {
      this.router.navigate(['login'], {queryParams: {redirect:'no-data'}});
    }
  }
}
