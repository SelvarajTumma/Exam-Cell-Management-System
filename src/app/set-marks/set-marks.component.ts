import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators,FormArray} from '@angular/forms';
import { ExamSystemService } from '../exam-system.service';
@Component({
  selector: 'app-set-marks',
  templateUrl: './set-marks.component.html',
  styleUrls: ['./set-marks.component.css']
})
export class SetMarksComponent implements OnInit {
  marks:FormGroup;
  setmarks:FormGroup;
  constructor(private formBuilder:FormBuilder,private examsystemservice:ExamSystemService) {
    this.marks=formBuilder.group({
      RollNo:["",Validators.required],
      Semester:["",Validators.required]
    });
    this.setmarks=formBuilder.group({
      RollNo:["",Validators.required],
      Regulation:["",Validators.required],
      Dept:["",Validators.required],
      semester:["",Validators.required],
      subjects:formBuilder.array([])
    })
  };
  semester:any=[
    "1-1","1-2","2-1","2-2","3-1","3-2","4-1","4-2"
  ];
  user:any;
  subjects:any;
  load:boolean;
  ngOnInit() {
    this.load=false;
  }
  Submit(){
    if(this.marks.valid){
      this.examsystemservice.paidlist(this.marks.value).subscribe(
        (res:any)=>{
          console.log(res);
          this.user=res;
          this.subjects=res.subjects;
          this.pop()
          this.patch();
          this.setmarks.patchValue({
            RollNo:this.user.username,
            Regulation:this.user.Regulation,
            Dept:this.user.Department,
            semester:this.user.semester
          })
          console.log(this.setmarks.value);
          this.load=true;
        },
        (err)=>{
          console.log(err);
        }
      )
    }
  }

  patch(){
    console.log("called");
    const control=<FormArray>this.setmarks.get('subjects');
    console.log(control.value);
    this.subjects.forEach(element => {
      control.push(this.patchValues(element.sub_code,element.sub_name,element.date,element.marks));
    });
    console.log(this.setmarks.value);
  }
  patchValues(sub_code,sub_name,date,marks){
    return this.formBuilder.group(
      {
        sub_code:[sub_code],
        sub_name:[sub_name],
        date:[date],
        marks:[marks, 
          [
            Validators.pattern(/^([0-9]|[1-9][0-9])$/),
            Validators.required
          ]
      ]
      }
    )
  }
  pop(){
    const control=<FormArray>this.setmarks.controls['subjects'];
    control.clear();
  }
  Addmarks(){
    if(this.setmarks.valid){
      console.log(this.setmarks.value);
      this.examsystemservice.setmarks(this.setmarks.value).subscribe
      (
        (res:any)=>
        {
          console.log(res);
          if(res.messsege=="saved"){
            this.pop();
            this.setmarks.patchValue(
              {
                RollNo:"",
                Regulation:"",
                Dept:"",
                Semester:""
              }
            )
            this.load=false;
          }
        }
        ,
        (err)=>
        {
          console.log(err);
        }
      )
    }
  }
}
