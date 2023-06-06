import { Component } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {
  stageName: string = "ステージ1";
  correctCount: number = 10;
  achievementTitle: string = "称号サンプル";
}
