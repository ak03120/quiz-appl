import { Component } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {
  choices: string[] = ['選択肢1', '選択肢2', '選択肢3', '選択肢4'];
}
