import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SocialMediaService {

   baseUsrl = "http://localhost:8080/api/v1/social";

  constructor(private http:HttpClient, private cookie:CookieService) { }


  signWithGoogle(token:string):Observable<any>{
    return this.http.post<any>(`${this.baseUsrl}/google`,{token}).pipe(
      map(response => {
          sessionStorage.setItem("email", response.email);
          sessionStorage.setItem("token",`Bearer ${response.token}`);
          sessionStorage.setItem("role",response.roles[0].name)

          this.cookie.set("email", response.email);
          this.cookie.set("token",`Bearer ${response.token}`);
          this.cookie.set("role",response.roles[0].name)

          return response
      }));
  }






}
