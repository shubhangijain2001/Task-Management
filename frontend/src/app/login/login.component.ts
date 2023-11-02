import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MandatoryDirective } from '../directive/mandatory.directive';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!:any
  emailPattern:string='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
  isFormValid:boolean=false

  constructor(private fb:FormBuilder){}

  prerequisite(){
    this.createForm()
  }

  ngOnInit(): void {
    this.prerequisite()
  }

  createForm(){
    this.loginForm=this.fb.group({
      email:['',[Validators.required,Validators.pattern(this.emailPattern)]],
      password:['',[Validators.required]]
    })
  }

  get loginFormControls(){
    return this.loginForm.controls
  }

  login(){
    if(!this.loginForm.invalid){
          
      console.log(this.isFormValid,this.loginForm);
    }
    else{
      console.log('djjhsdjhsd');
      this.isFormValid=true
    }
 }
  
}
