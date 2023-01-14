import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SpaceValidator } from 'src/app/model/SpaceValidator';
import { AuthenticationService } from 'src/app/services/security/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  formParentGroup!: FormGroup;
  formParentGroupReset!: FormGroup;
  enableFrom: boolean = true;

  constructor(private formChildGroup: FormBuilder,
              private authenticationService: AuthenticationService,
              private router:Router) { }

  ngOnInit(): void {
    this.myFormLogin();
    this.mySignupFormReset();
  }


  myFormLogin(){
    this.formParentGroup = this.formChildGroup.group({
      user:this.formChildGroup.group({
        email: new FormControl('',[
          Validators.required,
          SpaceValidator.onlyContainSpace,
          Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
        ]),
      })
    })
  }

  mySignupFormReset(){
    this.formParentGroupReset = this.formChildGroup.group({
      newUser: this.formChildGroup.group({
        code: new FormControl('',[Validators.required,
                                  SpaceValidator.onlyContainSpace]),
        password: new FormControl('', [Validators.required])
      })

    })

  }



  get email(){
    return this.formParentGroup.get('user.email')
  }

  get code(){
    return this.formParentGroupReset.get('newUser.code')
  }

  get password(){
    return this.formParentGroupReset.get('newUser.password')
  }


  done(){
    if(this.formParentGroup.invalid){
      this.formParentGroup.markAllAsTouched();
      return
   }

   this.authenticationService.checkEmail(this.formParentGroup.controls['user'].value.email).subscribe({
    next:response =>{
      if(response.result == 1){
         this.enableFrom = false;
      }
      else{
       console.log("email does not exists")
      }
    },
    error:err =>{

    }
   })

  }


  resetNewPassword(){
    if(this.formParentGroupReset.invalid){
      this.formParentGroupReset.markAllAsTouched();
      return
    }


    this.authenticationService.resetPassword(
      this.formParentGroup.controls['user'].value.email,
      this.formParentGroupReset.controls['newUser'].value.code,
      this.formParentGroupReset.controls['newUser'].value.password
    ).subscribe({
     next:response =>{
       if(response.result == 1){
         this.router.navigateByUrl("/login")
       }else{
        console.log("there is error")
       }
     },
     error:err =>{
       console.log('you can not reset your password')
     }
    })


  }





  }




