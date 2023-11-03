import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MandatoryDirective } from '../directive/mandatory.directive';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loginForm!:any
  emailPattern:string='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
  isFormValid:boolean=false
 result!:any
 error:string=''

  constructor(private fb:FormBuilder, private dataService: DataService, private router: Router){}

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

  login() {
    if (!this.loginForm.invalid) {
      const loginDetails={
      email:this.loginFormControls.email.value,
      password:this.loginFormControls.password.value
      }
      this.dataService.login(loginDetails).subscribe({
        next:(val:any)=>{
          //console.log(val.token);
          localStorage.setItem('token',val.token)
          this.router.navigate(['/dashboard'])
        },
        error:(err)=>{
          if(err.error.message)
         //console.log(err.error.message);
        this.error=err.error.message
        else
        this.error=err.statusText
        //console.log(err.statusText);
        window.alert(this.error)
        this.loginForm.reset({});
        }
      }
      );
    } 
    else {
      this.isFormValid = true
    }
  }
  
}
