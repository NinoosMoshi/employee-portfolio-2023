import { CodeActivationComponent } from './components/security/code-activation/code-activation.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/security/registration/registration.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/security/login/login.component';
import { RouteActiveService } from './services/security/canActive/route-active.service';
import { LoginActiveService } from './services/security/canActive/login-active.service';
import { AccountService } from './services/security/canActive/account.service';

const routes: Routes = [
  {path:'login', component:LoginComponent, canActivate:[LoginActiveService]},
  {path:'register', component:RegistrationComponent, canActivate:[LoginActiveService]},
  {path:'active', component:CodeActivationComponent, canActivate:[LoginActiveService, AccountService]},
  {path:'home', component:HomeComponent, canActivate:[RouteActiveService]},
  {path:'user', component:UserComponent, canActivate:[RouteActiveService]},
  {path:'admin', component:AdminComponent, canActivate:[RouteActiveService]},
  {path:"",redirectTo:"/login",pathMatch:'full'},
  {path:'**', redirectTo:'/login',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
