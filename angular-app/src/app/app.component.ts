import { Component } from '@angular/core';
import { SocialAuthService, SocialUser, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { UserService } from './user.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'quiz-appl';
  constructor(private userService: UserService, private router: Router, private authService: SocialAuthService) {}

  ngOnInit(): void {
    this.authService.initState.subscribe(next => {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        const user: SocialUser = JSON.parse(storedUser);
        if(user == null)
        {
          this.authService.signOut();
          localStorage.removeItem('currentUser');
          this.router.navigate(['/login']);
        }
        this.userService.currentUser = user;
      }
    })
    
  }
}
