import { Component, OnInit } from '@angular/core';
import { ExamSystemService } from '../exam-system.service';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { TokenService } from '../token.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalid=false;
  invalidCaptcha:boolean=false;
  operations=["+","-"];
  operator:string;
  first:number;
  second:number;
  LoginForm:FormGroup;
  constructor(private examsystem:ExamSystemService,private router:Router,formBuilder:FormBuilder,private tokenService:TokenService){ 
    this.LoginForm=formBuilder.group({
      username:['',Validators.required],
      password:['',Validators.required],
      captcha:['',Validators.required]
    });
  }
  ngOnInit() {
    this.first=Math.floor(Math.random() * (25 + 1));
    this.operator=String(this.operations[Math.floor(Math.random() * this.operations.length)]);
    this.second=Math.floor(Math.random() * (10 + 1));
    console.log(this.first,this.operator,this.second);
  }
  Submit(){
    
    console.log(eval(this.first+this.operator+this.second));
    console.log(this.LoginForm.value.captcha);
    if(this.LoginForm.value.captcha==eval(this.first+this.operator+this.second)){
      console.log("called");
      console.log(this.LoginForm.value);
      console.log(this.LoginForm.value.username,this.LoginForm.value.password);
      this.examsystem.login(this.LoginForm.value).subscribe(
        (res:any)=>{
          console.log(res);
          console.log(res.messege);
          console.log("working");
         if(res.messege=="Invalid"){
           this.invalid=true;
         }
         else{
           
           if(res.messege=="User"){
             console.log("called user");
             this.tokenService.saveUser({username:res.username,role:"User"});
             console.log(this.tokenService.isAuthenticated);
             console.log(this.tokenService.getUser);
             this.router.navigate(['/user']);
            }
           if(res.messege=="Admin"){
             this.router.navigate(['/Admin']);
             console.log("called admin");
            }
         }
        },
        (err)=>{
          console.log(err);
        }
      )
    }
    else{
      this.invalid=true;
      this.invalidCaptcha=true;
    }
  }
}
