import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/security/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-code-activation',
  templateUrl: './code-activation.component.html',
  styleUrls: ['./code-activation.component.css']
})
export class CodeActivationComponent implements OnInit {

  formParentGroup : FormGroup;

  email:string = '';



  constructor(private formChildGroup: FormBuilder,
              private authenticationService:AuthenticationService,
              private router:Router) { }

  ngOnInit(): void {
    this.email = sessionStorage.getItem("emailActive")
    this.mySignupForm();
  }

  mySignupForm(){
    this.formParentGroup = this.formChildGroup.group({
      user: this.formChildGroup.group({
        code: new FormControl('', [Validators.required])
      })

     })
  }


  get code(){
    return this.formParentGroup.get('user.code')
  }


  done(){
    if(this.formParentGroup.invalid){
      this.formParentGroup.markAllAsTouched()
      return;
   }

   this.authenticationService.activeAccount(
    this.email,
    this.formParentGroup.controls['user'].value.code
   ).subscribe({
    next:response =>{
      if(response.result == 1){
        sessionStorage.removeItem("emailActive");
        this.router.navigateByUrl("/login")
      }else{
        console.log("please write the correct CODE from your email")
      }
    },
    error:err =>{
      console.log("errrorrr")
    }
   })



  }




}
