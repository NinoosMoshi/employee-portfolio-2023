import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SpaceValidator } from 'src/app/model/SpaceValidator';

@Component({
  selector: 'app-code-activation',
  templateUrl: './code-activation.component.html',
  styleUrls: ['./code-activation.component.css']
})
export class CodeActivationComponent implements OnInit {

  formParentGroup : FormGroup;


  constructor(private formChildGroup: FormBuilder) { }

  ngOnInit(): void {
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

  }




}
