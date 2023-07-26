import { Component } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { Choice } from 'src/app/types/question';
import { Question } from 'src/app/types/question'
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  selectedChoice: Choice;
  constructor(private qService: QuestionService) {
    this.selectedChoice = {
      question_id: 0,
      content: '',
      order_number: 0
    };
  }
  choiceHistory: Choice[] = [];
  question_number = 1;
  choices: Choice[] = [{
    question_id: 0,
    content: "選択1",
    order_number: 1
  },
  {
    question_id: 0,
    content: "選択2",
    order_number: 2
  },
  {
    question_id: 0,
    content: "選択3",
    order_number: 3
  },
  {
    question_id: 0,
    content: "選択4",
    order_number: 4
  }]
  question: Question =
  {
    id: 0,
    stage_number: 1,
    question_text: "問題文1",
    question_image_url: null,
    // question_image_url:"https://pbs.twimg.com/card_img/1675384287611469829/U_LK6jrU?format=jpg&name=900x900",
    answer_type: "text",
    choices: this.choices,
    answer_correct: 1
  }
  ngOnInit(): void {
    console.log("1");
    
    this.qService.getQuestion(this.question_number).subscribe(
      (question: Question) => {
        console.log(question);
        this.question = question;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  nextQuestion() {
    this.question_number++;
    this.choiceHistory.push(this.selectedChoice);
    this.qService.getQuestion(this.question_number).subscribe(
      (question: Question) => {
        console.log(question);
        this.question = question;
      },
      (error) => {
        console.error(error);
      }
    );
    console.log(this.choiceHistory);
  }

  // question: Question = {
  //   id:0,
  //   stage_number:1,
  //   question_text:"問題文1",
  //   question_image_url:null,
  //   // question_image_url:"https://pbs.twimg.com/card_img/1675384287611469829/U_LK6jrU?format=jpg&name=900x900",
  //   answer_type:"text",
  //   choices: this.choices,
  //   answer_correct: 1
  // }
}
