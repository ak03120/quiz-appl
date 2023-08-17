import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './pages/start/start.component';
import { LoginComponent } from './pages/login/login.component';
import { StageComponent } from './pages/stage/stage.component';
import { QuestionComponent } from './pages/question/question.component';
import { ResultComponent } from './pages/result/result.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'start', component: StartComponent},//, canActivate: [authGuard]},
  {path: 'stage', component: StageComponent},
  {path: 'question', component: QuestionComponent},
  {path: 'result', component: ResultComponent},
  {path: 'profile', component: ProfileComponent},
  { path: '**', redirectTo: '/start', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
