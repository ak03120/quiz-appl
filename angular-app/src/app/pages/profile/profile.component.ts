import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  name: string = '名前名前名前名前名前名前名前名前名前名前名前名前名前名前名前名前名前名前名前名前名前名前名前名前名前名前';
  correctCount: number = 50;
  achievements: string[] = ["実績実績実績実績実績実績実績実績実績実績実績実績実績実績実績実績実績実績1", "実績2", "実績3"];
}
