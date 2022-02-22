import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ExamSystemService } from '../exam-system.service';
@Component({
  selector: 'app-paid-list',
  templateUrl: './paid-list.component.html',
  styleUrls: ['./paid-list.component.css']
})
export class PaidListComponent implements OnInit {
  paidList:FormGroup;
  semester:any=[
    "1-1","1-2","2-1","2-2","3-1","3-2","4-1","4-2"
  ];
  user:any;
  loaduser:boolean;
  loadlist:boolean;
  list:any;
  Exception:boolean;
  constructor(private formBuilder:FormBuilder,private examSystem:ExamSystemService) { 
    this.paidList=formBuilder.group({
      RollNo:["",Validators.required],
      Semester:["",Validators.required],
    })
  }
  ngOnInit() {
    this.loadlist,this.Exception,this.loadlist=false;
  }
  Submit(){
    this.loadlist,this.Exception,this.loadlist=false;
    this.user={};
    this.list={};
    console.log(this.paidList.value);
    if(this.paidList.valid){
      //check on the username and semester
      this.examSystem.paidlist(this.paidList.value).subscribe(
        (data)=>{
          console.log(data);
          this.user=data;
          this.loaduser=true;
        },
        (err)=>{
          console.log(err);
        }
      )
    }
    else{
      if(this.paidList.value.Semester==""){
        //search for username
        this.examSystem.paidlistus(this.paidList.value.RollNo).subscribe(
          (res:any)=>{
            console.log(res);
            this.list=res;
            this.loadlist=true; 
          },
          (err)=>{
            console.log(err);
          }
        )
      }
      else{
        //raise exeception
        this.Exception=true;
      }
    }
  }
}
