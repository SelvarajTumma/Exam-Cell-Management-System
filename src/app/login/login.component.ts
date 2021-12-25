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
    if(this.LoginForm.value.captcha==eval(this.first+this.operator+this.second)){
      this.examsystem.login(this.LoginForm.value).subscribe(
        (res:any)=>{
          console.log(res);
         if(res.messege=="Invalid"){
           this.invalid=true;
         }
         else{           
           if(res.messege=="User"){            
             this.tokenService.saveUser({username:res.username,role:"User"});   
             this.router.navigate(["/user"])      ;    
            }
           if(res.messege=="Admin"){
             this.router.navigate(['/Admin']);             
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
      if(this.LoginForm.value.captcha!=""){
        this.invalidCaptcha=true;
      }
    }
  }

  captcha(){
    this.first=Math.floor(Math.random() * (25 + 1));
    this.operator=String(this.operations[Math.floor(Math.random() * this.operations.length)]);
    this.second=Math.floor(Math.random() * (10 + 1));
  }
  
}
