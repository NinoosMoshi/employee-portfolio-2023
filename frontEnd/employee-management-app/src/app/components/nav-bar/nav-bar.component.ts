import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/security/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private authenticationService:AuthenticationService, private router:Router) { }

  ngOnInit(): void {
  }

  isAuthenticated(){
    return this.authenticationService.isLogin();
 }


 isLogout(){
  this.router.navigateByUrl("/login")
  this.authenticationService.logout();
}

isUser(){
  return this.authenticationService.getRole() == "ROLE_USER"
}

isAdmin(){
  return this.authenticationService.getRole() == "ROLE_ADMIN"
}

}
