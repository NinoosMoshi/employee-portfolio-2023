import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EmployeeComponent } from './components/employee/employee.component';
import { LoginComponent } from './components/security/login/login.component';
import { RegistrationComponent } from './components/security/registration/registration.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { UserComponent } from './components/user/user.component';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { AddComponent } from './components/admin/admin-components/add/add.component';
import { DeleteComponent } from './components/admin/admin-components/delete/delete.component';
import { SaveComponent } from './components/admin/admin-components/save/save.component';
import { HttpInterceptorService } from './services/security/http-interceptor.service';
import { CodeActivationComponent } from './components/security/code-activation/code-activation.component';
import { ResetPasswordComponent } from './components/security/reset-password/reset-password.component';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { NgbPaginationModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchComponent } from './components/search/search.component';



@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    LoginComponent,
    RegistrationComponent,
    NavBarComponent,
    UserComponent,
    AdminComponent,
    HomeComponent,
    AddComponent,
    DeleteComponent,
    SaveComponent,
    CodeActivationComponent,
    ResetPasswordComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule.forRoot({ type: 'ball-atom' }),
    SocialLoginModule,
    NgbPaginationModule,
    NgbModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass:HttpInterceptorService, multi:true},
    CookieService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '210659427338-6l2dsouv2jat11fhkvor9u9flheoh13t.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('503584255211653')
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
