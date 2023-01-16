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



     // http://localhost:8080/api/v1/auth/login
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

        }));
    }


      // http://localhost:8080/api/v1/auth/active
      UserActive(usernameOrEmail:string, password:string):Observable<any>{
        return this.http.post<any>(`${this.baseUrl}/active`,{usernameOrEmail,password}).pipe(
          map(response =>{
            return response
          })
        );
      }



      // // http://localhost:8080/api/v1/auth/activated
      // activeAccount(email:string, code:string):Observable<any>{
      //   return this.http.post<any>(`${this.baseUrl}/activated`,{email,code}).pipe(
      //     map(response =>{
      //       return response
      //     })
      //   );
      // }


        // http://localhost:8080/api/v1/auth/activated
        activeAccount(usernameOrEmail:string, code:string):Observable<any>{
          return this.http.post<any>(`${this.baseUrl}/activated`,{usernameOrEmail,code}).pipe(
            map(response =>{
              return response
            })
          );
        }


        // http://localhost:8080/api/v1/auth/check-email
        checkEmail(email:string):Observable<any>{
          return this.http.post<any>(`${this.baseUrl}/check-email`,{email}).pipe(
            map(response =>{
              return response
            })
          );
        }


        // http://localhost:8080/api/v1/auth/reset-password
        resetPassword(email:string, code:string, password:string):Observable<any>{
          return this.http.post<any>(`${this.baseUrl}/reset-password`,{email,code,password}).pipe(
            map(response =>{
              return response
            })
          );
        }




    // http://localhost:8080/api/v1/auth/register
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

