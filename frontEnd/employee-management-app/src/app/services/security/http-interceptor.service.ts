import { AuthenticationService } from './authentication.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor{

  constructor(private authenticationService: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(this.authenticationService.isLogin()){
      req = req.clone({
        setHeaders: {
          Authorization:this.authenticationService.getToken()
        }
      })
    }

    return next.handle(req);
  }


}
