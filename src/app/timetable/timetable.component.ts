import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormBuilder,Validators,FormArray, FormControl} from '@angular/forms';
import { ExamSystemService } from '../exam-system.service';
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
  constructor(private formBuilder:FormBuilder,private examsystemservice:ExamSystemService) {
    this.timetable=this.formBuilder.group({
      Regulation:["",Validators.required],
      Dept:["",Validators.required],
      Semester:["",Validators.required]
    });
    this.schedule=formBuilder.group({
      year:["",Validators.required],
      month:new FormControl("",[Validators.required]),
      subjects:formBuilder.group({
        subjectsArray:this.formBuilder.array([],Validators.required)
      }),
    }); 
  }
  
  ngOnInit() {
  }

  Submit(){
    console.log(this.timetable.value);
    if(this.timetable.valid){
      if(this.timetable.value.Regulation=="R19" && this.timetable.value.Dept=="AI"){
        this.Exception=true;
      }
      else{
        this.examsystemservice.getsubjects(this.timetable.value).subscribe(
          (res:any)=>{
            console.log(res);
            this.subjects=res.Subjects;
            this.patch();
            this.Showsubjects=true;
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
      //this.timetable.valid=false;
      
    }
  }
  submit(value){
    console.log("caleed");
    console.log(this.schedule.value);
    console.log(value);
    console.log(this.schedule.valid);
    
      this.examsystemservice.set_timetable(this.schedule.value).subscribe(
        (res)=>{
          console.log(res);
        },
        (err)=>{
          console.log(err);
        }
      )
    
  }
  patch(){
    console.log("called");
    const control=<FormArray>this.schedule.get('subjects.subjectsArray');
    this.subjects.forEach(element => {
      control.push(this.patchValues(element.sub_code,element.sub_name));
    });
    console.log(this.schedule.value);
  }
  patchValues(sub_code,sub_name){
    return this.formBuilder.group(
      {
        sub_code:[sub_code],
        sub_name:[sub_name],
        date:this.formBuilder.control("",Validators.required) 
      }
    )
  }
  // disableDate(){
  //   return false;
  // }
}


