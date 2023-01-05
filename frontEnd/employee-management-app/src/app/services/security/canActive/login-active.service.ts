import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoginActiveService implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router:Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.authenticationService.isLogin()){
       if(this.authenticationService.getRole() === 'ROLE_ADMIN'){
        this.router.navigateByUrl("/admin");
       }
       else if(this.authenticationService.getRole() === 'ROLE_USER'){
        this.router.navigateByUrl("/user");
       }
      return false;
    }

    return true;
  }


}
