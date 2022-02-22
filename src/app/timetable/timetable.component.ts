import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormBuilder,Validators,FormArray, FormControl} from '@angular/forms';
import { ExamSystemService } from '../exam-system.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {
  timetable:FormGroup
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
  schedule:FormGroup;
  Exception:boolean=false;
  Showsubjects:boolean=false;
  subjects:any;
  Invalid_SUBJECTS="Subjects";
  submitted:boolean=false;
  ressubmitted:boolean=false
  constructor(private formBuilder:FormBuilder,private examsystemservice:ExamSystemService,private router:Router) {
    this.timetable=this.formBuilder.group({
      Regulation:["",Validators.required],
      Dept:["",Validators.required],
      Semester:["",Validators.required],
    });
    // this.schedule=formBuilder.group({
    //   Regulation:[""],
    //   Dept:[""],
    //   Semester:[""],
    //   year:["",Validators.required],
    //   month:new FormControl("",[Validators.required]),
    //   subjects:formBuilder.group({
    //     subjectsArray:formBuilder.array([])
    //   }),
    // }); 
    this.schedule=formBuilder.group({
      Regulation:[""],
      Dept:[""],
      Semester:[""],
      year:["",Validators.required],
      month:new FormControl("",[Validators.required]),
      subjects:formBuilder.array([])
    }); 
  }
  ngOnInit() {
  }
  Submit(){
    console.log(this.timetable.value);
    this.submitted=false;
    if(this.timetable.valid){
      if(this.timetable.value.Regulation=="R19" && this.timetable.value.Dept=="AI"){
        this.Exception=true;
      }
      else{
        this.examsystemservice.getsubjects(this.timetable.value).subscribe(
          (res:any)=>{
            console.log(res);
            this.subjects=={};
            this.schedule.patchValue({
              Regulation:"",
              Dept:"",
              Semester:"",
              year:"",
              month:[],
              subjects:[]
            });
            this.pop();
            this.subjects=res.Subjects;
            this.patch();
            this.Showsubjects=true;
            this.schedule.patchValue({
              Regulation:this.timetable.value.Regulation,
              Dept:this.timetable.value.Dept,
              Semester:this.timetable.value.Semester
            })
            console.log(this.subjects);
            console.log(this.schedule.value);
          },
          (err)=>{
            console.log(err);
          }
        )
      }
    }
    else{
      throw console.error("please fill the form completely");      
    }
  }
  submit(value){
    console.log("caleed");
    console.log(this.schedule.value.subjects.length);
    console.log(value);
    console.log(this.schedule.valid);
    if(this.schedule.valid){
      console.log("called");
      this.examsystemservice.set_timetable(this.schedule.value).subscribe(
        (res:any)=>{
          if(res.messege="Sccessful"){
            this.submitted=true;
            this.Showsubjects=false;
            this.schedule.patchValue({
              Regulation:"",
              Dept:"",
              Semester:"",
              year:"",
              month:[],
            });
            this.pop();         
            console.log(this.schedule.value);
          }
          else{
            this.ressubmitted =true;
          } 
          },
          (err)=>{
            console.log(err);
          }
      )
    } 
  }
  pop(){
    const control=<FormArray>this.schedule.controls['subjects'];
    control.clear();
  }
  patch(){
    console.log("called");
    const control=<FormArray>this.schedule.get('subjects');
    console.log(control.value);
    this.subjects.forEach(element => {
      control.push(this.patchValues(element.sub_code,element.sub_name,element.date));
    });
    console.log(this.schedule.value);
  }
  patchValues(sub_code,sub_name,date){
    return this.formBuilder.group(
      {
        sub_code:[sub_code],
        sub_name:[sub_name],
        date:[date,[Validators.pattern(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/)]]
      }
    )
  }
}




