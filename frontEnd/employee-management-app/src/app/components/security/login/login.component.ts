import { AuthenticationService } from './../../../services/security/authentication.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import {SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from '@abacritt/angularx-social-login';



export function emailOrUsernameValidator(usernameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const usernameValidator = Validators.pattern(usernameRe);
    return control.value?.includes('@')
      ? Validators.email(control)
      : usernameValidator(control);
  };
}



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formParentGroup: FormGroup;
  submitted = false;

  user: SocialUser;
  loggedIn: boolean;


  constructor(private authenticationService: AuthenticationService,
              private formChildGroup: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private authService: SocialAuthService
              ) { }

              ngOnInit(): void {
                this.myLoginForm();
                this.signInWithGoogle();
              }

              signInWithGoogle(): void {
                this.authService.authState.subscribe((data) => {
                  this.user = data;
                  this.loggedIn = (data != null);
                  console.log(data)
                });
              }





              signInWithFB(): void {
                this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
                  data =>{
                    console.log(data);
                  }
                );
              }






              myLoginForm(){
                 this.formParentGroup = this.formChildGroup.group({
                  user: this.formChildGroup.group({
                    email : new FormControl('', [
                      Validators.required,
                      emailOrUsernameValidator(/[a-zA-Z0-9]{3,}/)
                    ]),
                    password: new FormControl('', [Validators.required])
                  })

                 })
              }

              get email(){
                return this.formParentGroup.get('user.email')
              }

              get password(){
                return this.formParentGroup.get('user.password')
              }





              login(){
                this.submitted = true;

                    if(this.formParentGroup.invalid){
                       this.formParentGroup.markAllAsTouched()
                       return;
                    }
                  this.authenticationService.UserActive(
                     this.formParentGroup.controls['user'].value.email,
                     this.formParentGroup.controls['user'].value.password
                  ).subscribe({
                    next:data =>{
                      if(data.active == 0){
                        sessionStorage.setItem("emailActive",this.formParentGroup.controls['user'].value.email);
                        this.router.navigateByUrl("/active");
                      }
                      else if(data.active == 1){
                        this.getExcuteTrue()
                      }
                      else{

                      }
                    },
                    error:err =>{

                    }
                  })

              }




            getExcuteTrue(){
              this.authenticationService.executeAuthentication(
                  this.formParentGroup.controls['user'].value.email,
                  this.formParentGroup.controls['user'].value.password
              ).subscribe({
                next:response =>{
                        const tempRole = response.roles[0].name;
                        if(tempRole === 'ROLE_ADMIN'){
                          this.router.navigateByUrl("/admin");
                        }else{
                          this.router.navigateByUrl("/user");
                        }
                },
                error:err =>{

                }
              })
            }

















              // login(){
              //   this.submitted = true;

              //       if(this.formParentGroup.invalid){
              //          this.formParentGroup.markAllAsTouched()
              //          return;
              //       }

              //   this.spinner.show();
              //   this.authenticationService.executeAuthentication(
              //     this.formParentGroup.controls['user'].value.email,
              //     this.formParentGroup.controls['user'].value.password
              //   ).subscribe({
              //     next:response =>{

              //       setTimeout(() => {
              //         this.spinner.hide();
              //       }, 2000);

              //       this.toastr.success('Success', 'You Logging Successfully', {timeOut: 2000});
              //       const tempRole = response.roles[0].name;
              //       if(tempRole === 'ROLE_ADMIN'){
              //         this.router.navigateByUrl("/admin");
              //       }else{
              //         this.router.navigateByUrl("/user");
              //       }
              //     },
              //     error:err =>{
              //       this.toastr.error('Error', 'your credentials are invalid', {timeOut: 3000})

              //       setTimeout(() => {
              //         this.spinner.hide();
              //       }, 2000);

              //     }
              //   })

              // }



}



