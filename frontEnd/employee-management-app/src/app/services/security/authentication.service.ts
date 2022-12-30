import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl = 'http://localhost:8080/api/v1/auth';

  constructor(private http:HttpClient, private cookie:CookieService) { }



     // http://localhost:8080/login
     executeAuthentication(usernameOrEmail:string, password:string):Observable<any>{
      return this.http.post<any>(`${this.baseUrl}/login`,{usernameOrEmail,password}).pipe(
        map(response =>{
          sessionStorage.setItem("email", response.email);
          sessionStorage.setItem("token",`Bearer ${response.token}`);
          sessionStorage.setItem("role",response.roles[0].name)

          this.cookie.set("email", response.email);
          this.cookie.set("token",`Bearer ${response.token}`);
          this.cookie.set("role",response.roles[0].name)

          return response

        })
      );
    }



    // http://localhost:8080/register
    createUser(name:string, username:string ,email:string, password:string):Observable<any>{
      return this.http.post(`${this.baseUrl}/register`,{name,username,email,password}).pipe(
        map(response => {
          console.log(response)
          return response
        })
      );
    }





    getEmail(){
      return sessionStorage.getItem("email");
    }

    getToken(){
        return sessionStorage.getItem("token")
    }

    getRole(){
      return sessionStorage.getItem("role")
    }

    isLogin(){
      return !(sessionStorage.getItem('email') == null || sessionStorage.getItem('token') == null);
   }

   logout(){
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    this.cookie.delete('email');
    this.cookie.delete('token');
    this.cookie.delete('role');
   }



}

