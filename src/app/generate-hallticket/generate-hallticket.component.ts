import { Component, OnInit } from '@angular/core';
import { TokenService } from '../token.service';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ExamSystemService } from '../exam-system.service';
@Component({
  selector: 'app-generate-hallticket',
  templateUrl: './generate-hallticket.component.html',
  styleUrls: ['./generate-hallticket.component.css']
})
export class GenerateHallticketComponent implements OnInit {
  username="";
  semester:any=[
    "1-1","1-2","2-1","2-2","3-1","3-2","4-1","4-2"
  ];
  load:boolean;
  Hallticket:FormGroup;
  cDetails:any;
  constructor(private tokenservice:TokenService,private formBuilder:FormBuilder,private examsystemservice:ExamSystemService) { 
    this.Hallticket=formBuilder.group({
      RollNo:["",Validators.required],
      Semester:["",Validators.required]
    })
  }
  ticket:any;
  ngOnInit() {
    this.username=this.tokenservice.getUser().username;
    console.log(this.username);
    this.Hallticket.patchValue({
      RollNo:this.username
    });
    this.load=false;
  }
  Submit(){
    if(this.cDetails==null || this.cDetails==undefined){
     
      this.examsystemservice.getCollege().subscribe(
        (data)=>{
          console.log(data);
          this.cDetails=data;
        },
        (err)=>{
          console.log(err);
        }
      )
     
    }
    console.log(this.Hallticket.value);
    if(this.Hallticket.valid){
      this.examsystemservice.paidlist(this.Hallticket.value).subscribe(
        (res)=>{
          console.log(res);
          this.load=true;
          this.ticket=res;
        },
        (err)=>{
          console.log(err);
        }
      )
    }
  }

}
