import { Component, OnInit } from '@angular/core';
import { TokenService } from '../token.service';
import { ExamSystemService } from '../exam-system.service';
import { FormGroup ,FormBuilder,Validators} from '@angular/forms';
@Component({
  selector: 'app-marks',
  templateUrl: './marks.component.html',
  styleUrls: ['./marks.component.css']
})
export class MarksComponent implements OnInit {
  user:String;
  load:boolean;
  marks:any;
  query:FormGroup;
  constructor(private token:TokenService,private examsystem:ExamSystemService,private formbuilder:FormBuilder) {
    this.query=formbuilder.group(
      {
        RollNo:["",Validators.required],
        semester:["",Validators.required]
      }
    )
   }
   semester:any=[
    "1-1","1-2","2-1","2-2","3-1","3-2","4-1","4-2"
  ];
  ngOnInit() {
    this.load=false;
    this.user=this.token.getUser().username;
    console.log(this.user);
    this.query.patchValue(
      {
        RollNo:this.user
      }
    )
  }
  get(){
    console.log(this.query.value);
    if(this.query.valid){
      this.examsystem.getmarks(this.query.value).subscribe(
        (res:any)=>{
          console.log(res);
          this.marks=res.subjects;
          this.load=true;
        },
        (err)=>{
          console.log(err);
        }
      )
    }
  }
}
