import { Component } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { Choice } from 'src/app/types/question';
import { Question } from 'src/app/types/question'
import { OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  selectedChoice: Choice;
  constructor(private qService: QuestionService, private router: Router, private route: ActivatedRoute, private http: HttpClient) {
    this.selectedChoice = {
      question_id: 0,
      content: '',
      order_number: 0
    };
  }
  questionId = Number(this.route.snapshot.paramMap.get('stage'));
  questionNumber: number = 0;
  choices: Choice[] = []
  question: Question = {
    id: 0,
    stage_number: 0,
    question_text: '',
    question_image_url: null,
    answer_type: '',
    choices: [],
    answer_correct: 0
  }
  ngOnInit(): void {
    if(this.questionId === null)
    {
      this.router.navigate(["/start"]);
    }
    if(this.questionId > 1)
    {
      this.questionId = (this.questionId-1)*10+1;
    }
    this.qService.getQuestion(this.questionId).subscribe(
      (question: Question) => {
        this.question = question;
        this.questionNumber = this.qService.questionNumber;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  nextQuestion() {
    if(this.selectedChoice.question_id == 0)
      return;
    this.questionId++;
    this.qService.choiceHistory.push(this.selectedChoice);

    if(this.selectedChoice.order_number === this.question.answer_correct)
      this.qService.correctCount++;


    this.qService.getQuestion(this.questionId).subscribe(
      (question: Question) => {
        this.question = question;
        this.questionNumber = this.qService.questionNumber;
      },
      (error) => {
        console.error(error);
      }
    );
    console.log(this.qService.choiceHistory);
    this.selectedChoice = {
      question_id: 0,
      content: '',
      order_number: 0
    };
    if(this.qService.choiceHistory.length % 10 == 0)
    {
      this.router.navigate(['/result']);
    }
  }
}
