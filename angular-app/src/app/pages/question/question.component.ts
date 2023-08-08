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
  question_number = this.route.snapshot.params['stage'];

  
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
    if(this.question_number > 1)
    {
      this.question_number = (this.question_number-1)*10+1;
    }
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
    if(this.selectedChoice.question_id == 0)
      return;
    this.question_number++;
    this.qService.choiceHistory.push(this.selectedChoice);
    console.log(this.selectedChoice.order_number,this.question.answer_correct);

    if(this.selectedChoice.order_number === this.question.answer_correct)
    {
      this.qService.correctCount++;
      const jsonData = {
        data: {
          question_progress: this.qService.correctCount + ((this.question.stage_number-1)*10),
          stage_progress: this.qService.choiceHistory[0].question_id%10,
        }
      };
      this.http.put('http://localhost:1337/api/profiles/1', jsonData).subscribe(response => {
        console.log(response)
      }, error => {
        console.log(error)
      });
    }
    this.qService.getQuestion(this.question_number).subscribe(
      (question: Question) => {
        console.log(question);
        this.question = question;
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
