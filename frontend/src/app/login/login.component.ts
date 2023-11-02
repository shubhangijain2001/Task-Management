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

      const email = this.loginFormControls.email.value;
      const password = this.loginFormControls.password.value;

      this.dataService.login(email, password).subscribe((data: any) => {
        console.log(data);

        localStorage.setItem('token', data.token);
        this.router.navigate(['/dashboard']);
      })
    } else {
      // console.log('djjhsdjhsd');
      this.isFormValid = true
    }
  }
  
}
