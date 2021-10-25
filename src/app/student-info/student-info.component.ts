import { Component, OnInit } from '@angular/core';
import { TokenService } from '../token.service';
import { ExamSystemService } from '../exam-system.service';
@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css']
})
export class StudentInfoComponent implements OnInit {
  user:any;
  details:any={};
  constructor(private tokenService:TokenService,private examService:ExamSystemService) { }

  ngOnInit() {
    this.user=this.tokenService.getUser();
    this.examService.getStudentDetails(this.user.username).subscribe(
      (res:any)=>{
        console.log(res);
        this.details=res;
        console.log(this.details);
      },
      (err)=>{
        console.log(err);
      }
    )
  }
  
}
