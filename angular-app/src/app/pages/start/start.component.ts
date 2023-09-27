import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit{
  constructor(public profileSvc: ProfileService, public user: UserService, private authService: SocialAuthService, private router: Router, private route: ActivatedRoute) {
  }
  ngOnInit(): void {
  }
  signOut(): void {
    // this.authService.signOut();
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
