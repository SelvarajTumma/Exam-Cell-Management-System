import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators ,FormArray} from '@angular/forms';
import { ExamSystemService } from '../exam-system.service';
@Component({
  selector: 'app-edit-marks',
  templateUrl: './edit-marks.component.html',
  styleUrls: ['./edit-marks.component.css']
})
export class EditMarksComponent implements OnInit {
  query:FormGroup;
  Editmarks:FormGroup;
  subjects: any;
  constructor(private formbuilder:FormBuilder,private examsystemservice:ExamSystemService) { 
    this.query=formbuilder.group({
      RollNo:["",Validators.required],
      Semester:["",Validators.required]
    })
    this.Editmarks=formbuilder.group({
      RollNo:["",Validators.required],
      Regulation:["",Validators.required],
      Dept:["",Validators.required],
      semester:["",Validators.required],
      subjects:formbuilder.array([])
    })
  }
  user:any;
  semester:any=[
    "1-1","1-2","2-1","2-2","3-1","3-2","4-1","4-2"
  ];
  load:boolean;
  key:String;
  ngOnInit() {
    this.load=false;
  }
  get(){
    console.log(this.query.value);
    if(this.query.valid){
      this.examsystemservice.getmarks(this.query.value).subscribe(
        (res:any)=>{
          console.log(res);
          this.user=res;
          this.subjects=res.subjects;
          this.pop()
          this.patch();
          this.Editmarks.patchValue({
            RollNo:this.user.RollNo,
            Regulation:this.user.Regulation,
            Dept:this.user.Dept,
            semester:this.user.semester
          })
          console.log(this.Editmarks.value);
          this.load=true;
          this.key=res._id;
          console.log(this.key)
        },
        (err)=>{
          console.log(err);
        }
      )
    }
  }

  patch(){
    console.log("called");
    const control=<FormArray>this.Editmarks.get('subjects');
    console.log(control.value);
    this.subjects.forEach(element => {
      control.push(this.patchValues(element.sub_code,element.sub_name,element.date,element.marks));
    });
    console.log(this.Editmarks.value);
  }
  patchValues(sub_code,sub_name,date,marks){
    return this.formbuilder.group(
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
    const control=<FormArray>this.Editmarks.controls['subjects'];
    control.clear();
  }
  delete(){
    this.examsystemservice.Deletemarks(this.key).subscribe(
      (res:any)=>{
        console.log(res);
        if(res.message=="deleted"){
          this.pop();
          this.load=false;
          this.Editmarks.patchValue(
            {
              RollNo:"",
            Regulation:"",
            Dept:"",
            semester:""
            }
          )
        }
        
      }
    )
  }
  // EDITmarks(){
  //   if(this.Editmarks.valid){
  //     this.examsystemservice.EditMarks(this.Editmarks.value,this.key).subscribe(
  //       (res:any)=>{
  //         console.log(res);
  //         if(res.message=="updated"){
  //           this.pop();
  //           this.load=false;
  //           this.Editmarks.patchValue(
  //             {
  //               RollNo:"",
  //             Regulation:"",
  //             Dept:"",
  //             semester:""
  //             }
  //           )
  //         }
  //       },
  //       (err)=>{
  //         console.log(err);
  //       }
  //     )
  //   }
  // }
}
