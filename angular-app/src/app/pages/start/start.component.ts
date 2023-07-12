import { Component } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent {
  constructor(public user: UserService, private authService: SocialAuthService, private router: Router) {

  }
  signOut(): void {
    this.authService.signOut();
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
