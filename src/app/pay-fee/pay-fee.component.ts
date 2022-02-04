import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { ExamSystemService } from '../exam-system.service';
import { TokenService } from '../token.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pay-fee',
  templateUrl: './pay-fee.component.html',
  styleUrls: ['./pay-fee.component.css']
})
export class PayFeeComponent implements OnInit {
  get_timetable:FormGroup;
  semester:any=[
    "1-1","1-2","2-1","2-2","3-1","3-2","4-1","4-2"
  ]
  dept:any=["MECH","CSE","ECE","EEE","CE","IT","AI"];
  regulation:any=[
    "R19","R20"
  ];
  months:any=[
    "JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"
  ];
  Exception:boolean;
  subjects:any;
  data:any;
  Fees:number;
  loadFee:boolean;
  user:String;
  constructor(private formBuilder:FormBuilder,private examsystemservice:ExamSystemService,private tokenservice:TokenService,private router:Router) {
    this.get_timetable=formBuilder.group({
      Regulation:["",Validators.required],
      Dept:["",Validators.required],
      Semester:["",Validators.required],  
      year:["",Validators.required],
      month:new FormControl("",[Validators.required])
    })
   }
   displayedColumns:String[]=["sub_code","sub_name","date"];
   load:boolean;
  ngOnInit() {
    this.Exception=false;
    this.load=false;
    this.loadFee=false;
    this.user=this.tokenservice.getUser().username;
  }
  submit(value:any){
    console.log(this.get_timetable.value);
    console.log(value)
    if(this.get_timetable.valid){
      if(this.get_timetable.value.Regulation=="R19" && this.get_timetable.value.Dept=="AI"){
        this.Exception=true;
      }
      else{
        this.examsystemservice.get_timetable(value).subscribe(
          (res:any)=>{
            console.log(res);
            this.subjects=res.subjects;
            this.data=res;
            this.load=true;
            console.log(this.subjects)
          },
          (err)=>{
            console.log(err);
          }
        )
      }
    }
    else{

    }
  }
  fees(length){
    this.examsystemservice.getFees(length).subscribe(
      (res:any)=>{
        console.log(res);
        this.Fees=res;
        console.log(this.Fees)
        this.loadFee=true;
      },
      (err)=>{
        console.log(err);
      }
    )
  }
  payFee(){
    this.examsystemservice.payFees({username:this.user,
      Regulation:this.get_timetable.value.Regulation,
      Semester: this.get_timetable.value.Semester ,  
      Department:this.get_timetable.value.Dept,
      Fees:  this.Fees,
      subjects:this.subjects,
  }).subscribe(
      (res:any)=>{
        if(res.message=="Paid"){
          alert("Fees paid");
          this.reset();
        }
        if(res.message=="error"){
          alert("Error occured while paying ");
        }
      },
      (err)=>{
        console.log(err);
      }
    )
  }
  reset(){
    this.load=false;
    this.loadFee=false;
    this.subjects={};
  }
}
