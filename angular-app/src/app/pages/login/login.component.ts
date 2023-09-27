import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { GoogleInitOptions } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  user?: SocialUser = undefined;
  loggedIn: boolean = false;
  private accessToken: string = "";
  constructor(private authService: SocialAuthService, private httpClient: HttpClient, private router: Router, public userService: UserService) { }
  ngOnInit() {
    // this.authService.authState.subscribe((user) => {
    //   localStorage.setItem('currentUser', JSON.stringify(user));
    //   this.userService.currentUser = user;
    //   this.user = user;
    //   this.loggedIn = (user != null);
    //   console.log(""+user.id+this.loggedIn);
    //   if(this.loggedIn)
    //   {
    //    this.router.navigate(['/start']);
    //   }
    // });
  }
  getAccessToken(): void {
    this.authService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(accessToken => this.accessToken = accessToken);
  }
  refreshToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }
  logOut(): void {
    this.authService.signOut();
  }
  googleLogin(): void {
    location.href = ("http://localhost:1337/api/connect/google");
  }
}