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
  LoginForm:FormGroup;
  constructor(private examsystem:ExamSystemService,private router:Router,formBuilder:FormBuilder,
    private tokenService:TokenService){ 
    this.LoginForm=formBuilder.group({
      username:['',Validators.required],
      password:['',Validators.required]
    });
  }
  ngOnInit() {
  }
  Submit(){
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
           this.router.navigate(["/user"]);
          }
         if(res.messege=="Admin"){
           this.router.navigate(["/admin"]);
           console.log("called admin");
          }
       }
      },
      (err)=>{
        console.log(err);
      }
    )
  }

}
