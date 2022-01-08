import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators,FormArray } from '@angular/forms';
import { ExamSystemService } from '../exam-system.service';
@Component({
  selector: 'app-edit-timetable',
  templateUrl: './edit-timetable.component.html',
  styleUrls: ['./edit-timetable.component.css']
})
export class EditTimetableComponent implements OnInit {
  fetch_timetable:FormGroup;
  edit_timetable:FormGroup;
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
  subjects:any;
  showTimetable:boolean=false;
  Exception:boolean=false;
  updatedTimetable:boolean=false;
  key:String
  errorInupdation=false;
  constructor(private formBuilder:FormBuilder,private examsystemservice:ExamSystemService) { 
    this.fetch_timetable=formBuilder.group({
      Regulation:["",Validators.required],
      Dept:["",Validators.required],
      Semester:["",Validators.required],  
      year:["",Validators.required],
      month:new FormControl("",[Validators.required])
    })
    this.edit_timetable=this.formBuilder.group({
      year:["",Validators.required],
      month:new FormControl("",[Validators.required]),
      subjects:formBuilder.group({
        subjectsArray:formBuilder.array([])
      }),
    })
  }
  ngOnInit() {
  }
  fetch_Timetable(details:any){
    console.log(this.fetch_timetable.value);
    if(this.fetch_timetable.valid){
      if(this.fetch_timetable.value.Regulation=="R19" && this.fetch_timetable.value.Dept=="AI"){
        this.Exception=true;
      }
      else{
        this.examsystemservice.get_timetable(this.fetch_timetable.value).subscribe(
          (res:any)=>{
            console.log(res);
            console.log(res[0].Regulation);
            this.edit_timetable.patchValue({
              year:res[0].year,
              month:res[0].month
            });
            this.subjects=res[0].subjects.subjectsArray;
            this.patch();
            this.showTimetable=true;
            this.key=res[0]._id;
            console.log(this.key)
          },
          (err)=>{
            console.log(err);
          }
        )
      }
    }
  }


  edit_Timetable(data){
    console.log(this.edit_timetable.value);
    if(this.edit_timetable.valid){
      this.examsystemservice.edit_Timetable(this.edit_timetable.value,this.key).subscribe(
        (res:any)=>{
          console.log(res);
          if(res.messege=="sccess"){
            this.updatedTimetable=true;
            this.showTimetable=false;
            this.edit_timetable.reset;
            this.key="";
          }
          if(res.messege=="Error"){
            this.errorInupdation=true;
          }
        },
        (err)=>{
          console.log(err);
        }
      )
    }
  }
  delete_TImetable(){
    this.examsystemservice.delete_timetable(this.key).subscribe(
      (res:any)=>{
        if(res.messege=="Success"){
          this.showTimetable=false;
          this.key="";
          this.edit_timetable.reset;
        }
      },
      (err)=>{

      }
    )
  }
  patch(){
    console.log("called");
    const control=<FormArray>this.edit_timetable.get('subjects.subjectsArray');
    this.subjects.forEach(element => {
      control.push(this.patchValues(element.sub_code,element.sub_name,element.date));
    });
    console.log(this.edit_timetable.value);
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
