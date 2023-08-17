import { Component } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { Result } from 'src/app/types/result';
import { Router } from '@angular/router'
import { ResultService } from 'src/app/services/result.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {
  result: Result = {id: 0, stage_number: 0, achievement: "Achievement"};
  correct_count: number = 0;
  constructor(private qService: QuestionService, private router: Router, private rService: ResultService) {
    this.correct_count = qService.correctCount;
  }
  ngOnInit(): void {
    this.rService.getResult(this.qService.choiceHistory[0].question_id%10).subscribe(
      (result: Result) => {
        this.result = result;
      },
      (error) => {
        console.error(error);
      }
    )
  }
}
