import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/security/authentication.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private authenticationService:AuthenticationService,
              private router:Router,
              private authService: SocialAuthService
              ) { }

  ngOnInit(): void {
  }

  isAuthenticated(){
    return this.authenticationService.isLogin();
 }


 isLogout(){
  this.router.navigateByUrl("/login")
  this.authenticationService.logout();
  this.authService.signOut();  // sign out for google
}

isUser(){
  return this.authenticationService.getRole() == "ROLE_USER"
}

isAdmin(){
  return this.authenticationService.getRole() == "ROLE_ADMIN"
}

}
