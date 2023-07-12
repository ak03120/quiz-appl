import { Component } from '@angular/core';
import { Result } from 'src/app/types/result';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {
  result: Result = {
    stage_name: "ステージ1",
    correct_count: 10,
    achievement: "称号サンプル"
  }
}
