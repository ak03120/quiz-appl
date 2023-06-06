import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './pages/start/start.component';
import { LoginComponent } from './pages/login/login.component';
import { StageComponent } from './pages/stage/stage.component';
import { QuestionComponent } from './pages/question/question.component';
import { ResultComponent } from './pages/result/result.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'start', component: StartComponent},
  {path: 'stage', component: StageComponent},
  {path: 'question', component: QuestionComponent},
  {path: 'result', component: ResultComponent},
  {path: '**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
