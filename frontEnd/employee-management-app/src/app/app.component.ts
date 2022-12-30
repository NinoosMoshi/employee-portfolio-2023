import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'employee-management-app';


  constructor(private cookie: CookieService){}

  ngOnInit(): void {
    if(this.isCookie()){
      sessionStorage.setItem("email", this.cookie.get("email"));
      sessionStorage.setItem("token", this.cookie.get("token"));
      sessionStorage.setItem("role", this.cookie.get("role"));
    }

  }


  isCookie(){
    if(this.cookie.get("email") === '' || this.cookie.get("token") === ''){
      return false;
    }
      return true;
  }


}
