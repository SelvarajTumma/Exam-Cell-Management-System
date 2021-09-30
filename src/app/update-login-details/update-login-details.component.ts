import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from "@angular/forms";
import {Router} from"@angular/router";
import { ExamSystemService } from '../exam-system.service';
@Component({
  selector: 'app-update-login-details',
  templateUrl: './update-login-details.component.html',
  styleUrls: ['./update-login-details.component.css']
})
export class UpdateLoginDetailsComponent implements OnInit {
  update_details:FormGroup;
  constructor(private router:Router,private examsystem:ExamSystemService,formBuilder:FormBuilder) { 
    this.update_details=formBuilder.group({
      username:['',Validators.required],
      new_password:['',Validators.required]
    });
  }

  ngOnInit() {

    
  }
  Submit(){
    console.log("hello world");
    console.log(this.update_details.value);
    this.examsystem.update_password(this.update_details).subscribe(
      (err)=>{
        console.log(err);
      },
      (res)=>{

      }
    )
  }

}
