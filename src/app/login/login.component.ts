import { Component, OnInit } from '@angular/core';
import { ExamSystemService } from '../exam-system.service';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalid=false;
  LoginForm:FormGroup;
  constructor(private examsystem:ExamSystemService,private router:Router,formBuilder:FormBuilder){ 
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
      (err)=>{
       console.log(err);
      },
      (res:any)=>{
        console.log(res);
       if(res.error_code==-1){
         this.invalid=true;
       }
       else{
         if(res.resp_code=1 && res.resp_type=="user"){
           this.router.navigate["/user"];
         }
         if(res.resp_code=1 && res.resp_type=="admin"){
           this.router.navigate["/admin"];
         }
       }
      }
    )
    
    
  }

}
