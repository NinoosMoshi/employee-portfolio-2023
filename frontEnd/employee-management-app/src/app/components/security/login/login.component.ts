import { AuthenticationService } from './../../../services/security/authentication.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';



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

  constructor(private authenticationService: AuthenticationService,
              private formChildGroup: FormBuilder,
              private router: Router
              ) { }

              ngOnInit(): void {
                this.myLoginForm();
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



}



