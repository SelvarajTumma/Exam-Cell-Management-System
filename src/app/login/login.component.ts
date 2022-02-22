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
    this.captcha();
  }
  Submit(){
    console.log("called");  
    this.invalid=false;
    this.invalidCaptcha=false;
    if(this.LoginForm.valid){
      if(this.LoginForm.value.captcha==eval(this.first+this.operator+this.second)){
        this.examsystem.login(this.LoginForm.value).subscribe(
          (res:any)=>{
            console.log(res);
           if(res.messege=="Invalid"){
             this.invalid=true;
             this.captcha();
           }
           else{           
             if(res.messege=="User"){            
               this.tokenService.saveUser({username:res.username,role:"User"});   
               this.router.navigate(["/user"])      ;    
              }
             if(res.messege=="Admin"){
               this.tokenService.saveUser({username:res.username,role:"admin"});
               this.router.navigate(['/Admin']);     
               console.log("called")        
              }
           }
          },
          (err)=>{
            console.log(err);
          }
        )
      }
      else{
        if(this.LoginForm.value.captcha!=""){
          this.invalidCaptcha=true;
          this.captcha();
        }
      }
    }
    else{
      this.invalid=false;
    }
  }
  captcha(){
    this.first=Math.floor(Math.random() * (25 + 1));
    this.operator=String(this.operations[Math.floor(Math.random() * this.operations.length)]);
    this.second=Math.floor(Math.random() * (10 + 1));
  }
}
