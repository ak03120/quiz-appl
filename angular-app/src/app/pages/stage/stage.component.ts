import { Component } from '@angular/core';
import { Stage } from 'src/app/types/stage';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss']
})
export class StageComponent {
  stages: Stage[] = [
    {id: 0, name: "ステージ1", correctCount: 10},
    {id: 1, name: "ステージ2", correctCount: 7},
    {id: 2, name: "ステージ3", correctCount: 0},
    {id: 3, name: "ステージ4", correctCount: 0},
    {id: 4, name: "ステージ5", correctCount: 0},
    {id: 5, name: "ステージ6", correctCount: 0},

  ];

}
