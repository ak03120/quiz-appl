import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio'
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
} from '@abacritt/angularx-social-login';

import { LoginComponent } from './pages/login/login.component';
import { StartComponent } from './pages/start/start.component';
import { StageComponent } from './pages/stage/stage.component';
import { QuestionComponent } from './pages/question/question.component';
import { ResultComponent } from './pages/result/result.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login'
import { GoogleInitOptions } from '@abacritt/angularx-social-login';

const googleLoginOptions: GoogleInitOptions = {
  oneTapEnabled: true, // default is true
  scopes: 'https://www.googleapis.com/auth/userinfo.profile'
};

import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './pages/auth/auth.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    LoginComponent,
    StageComponent,
    QuestionComponent,
    ResultComponent,
    ToolbarComponent,
    ProfileComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatProgressBarModule,
    MatRadioModule,
    NgxSkeletonLoaderModule,
    MatSidenavModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '831105382657-45pj5bu9j03t4p8lh54qpuegogbjnpso.apps.googleusercontent.com', googleLoginOptions
            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }